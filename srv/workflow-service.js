const cds = require('@sap/cds')
const { WorkflowInstancesApi, UserTaskInstancesApi } = require('@sap/cloud-sdk-workflow-service-cf')
const utils  = require('./utils')

// const getDestination = function (req) {
//     const jwt = req.headers.authorization.slice(7)
//     if (!jwt) {
//         throw 'JWT not found!'
//     }
//     return {
//         destinationName: 'WorkflowRESTAPI',
//         jwt: jwt   
//     }
// }

const getDestinationWithClientCredential = function () {
    return {
        destinationName: 'Workflow-Api'
    }    
} 

const updateStatus = async function (req, status) {
    //get workflow instance id
    const { WorkflowInstances } = cds.entities
    const id = req.params[0];
    const result = await SELECT.one.from(WorkflowInstances)
        .columns`{instanceId}`.where({ ID: id })
    if (!result || !result.instanceId) {
        req.reject('indstancdId not found!')
    }

    const body = {
        status: status,
        cascade: false
    };

    try {
        await WorkflowInstancesApi.updateInstance(
            instanceId,
            body,
        ).execute(utils.getDestination(req));
    } catch (err) {
        req.reject(err)
    }

    //update DB status
    const n = await UPDATE(WorkflowInstances).set({ status: status }).where({ ID: id })
    n > 0 || req.err(500, 'Update of CAP status failed!')
}

const getContext = async function (req) {
    // get current context
    const { WorkflowInstances } = cds.entities
    const id = req.params[0]
    const result = await SELECT.one.from(WorkflowInstances).columns(`{instanceId}`).where({ID: id})
    if (!result || !result.instanceId) {
        req.reject('InstanceId not found!') 
    }      

    try {
        const workflowInstanceID = result.instanceId
        const context = await WorkflowInstancesApi.getInstanceContext(workflowInstanceID)
                        .execute(utils.getDestination(req))   
        return context
    }
    catch (err) {
        req.reject(err)
    }
}

module.exports = async function () {
    this.before('READ', 'WorkflowInstances', async(context) => {
        const jwt = context.req.authInfo.getTokenInfo().getTokenValue()
        console.log('READ handler');
        console.log('jwt: ', jwt)
    })

    this.before('CREATE', 'WorkflowInstances', async (req) => {
        if (req.headers.decision) {
            return
        }

        await utils.checkApprovers(req)

        let history = [];
        //copy history data
        if (req.data.referenceId) {
            const { History } = cds.entities
            const result = await SELECT.from(History)
                .columns`{
                userId,
                comment,
                taskType,
                completedAt,
                decision,
                rootInstanceId
            }`.where({ WorkflowInstance_ID: req.data.referenceId })

            history = result.map((data) => {
                return {
                    userId: data.userId,
                    comment: data.comment,
                    taskType: data.taskType,
                    completedAt: data.completedAt,
                    decision: data.decision,
                    rootInstanceId: req.data.referenceId
                }
            });

            //TODO: add pull back record
        }

        //start workflow
        const approvalSteps = req.data.Processors.map((processor) => {
            return {
                taskType: processor.taskType,
                decision: processor.decision,
                index: processor.index,
                comment: processor.comment,
                userId: processor.userId,
                isComplete: processor.isComplete
            }
        })
        const context = {
            requestId: req.data.businessKey,
            requester: req.data.requester,
            subject: req.data.subject,
            referenceId: req.data.referenceId,
            approvalSteps: approvalSteps,
            approvalHistory: history ? history : []
        }
        try {
            // const instance = await WorkflowInstancesApi.startInstance({
            //     definitionId: 'multilevelapproval',
            //     context: context,
            // }).execute(utils.getDestination(req));

            // //set instance info
            // req.data.instanceId = instance.id
            // req.data.startedAt = instance.startedAt
            // req.data.startedBy = instance.startedBy
            // req.data.status = instance.status

            //create association to history
            //in the case of new request, insert requester to the history
            let requester;
            if (req.data.Processors) {
                requester = req.data.Processors.find((processor) => {
                    return processor.taskType === "REQUEST"
                })
            }

            if (!req.data.referenceId && requester) {
                history.push({
                    userId: requester.userId,
                    comment: requester.comment,
                    taskType: requester.taskType,
                    completedAt: new Date(),
                    decision: requester.decision
                });
            }
            req.data.History = history ? history : []  

        } catch (err) {
            req.reject(err)
        }
    })

    this.before('UPDATE', 'WorkflowInstances', async (req) => {
        console.log("UPDATE:WorkflowInstances")
    //     //update user task
        if (!req.headers.decision || !req.headers.taskinstanceid) {
            return
        }

        const approvalSteps = req.data.Processors.map((processor) => {
            return {
                taskType: processor.taskType,
                decision: processor.decision,
                index: processor.index,
                comment: processor.comment,
                userId: processor.userId,
                isComplete: processor.isComplete
            }
        })        

        //2021.08.06
        let reworkProcessor = {}
        if (req.headers.reworkprocessor) {
            reworkProcessor = JSON.parse(req.headers.reworkprocessor)
        }

        const updateContext = {
            subject: req.data.subject,
            decision: req.headers.decision,
            approvalSteps: approvalSteps,
            reworkProcessor: reworkProcessor
        }

        try {
            // // get current context
            // const result = await SELECT.one.from(WorkflowInstances).columns(`{instanceId}`).where({ID: id})
            // if (!result || !result.instanceId) {
            //     throw 'InstanceId not found!'
            // }       
            // const workflowInstanceID = result.instanceId
            // const context = await WorkflowInstancesApi.getInstanceContext(workflowInstanceID)
            //                 .execute(utils.getDestination(req))   

           // get context before update
            const context = await getContext(req)              

            // udate task
            await UserTaskInstancesApi.updateInstance(req.headers.taskinstanceid, {
                context: updateContext,
                status: 'COMPLETED',
            }).execute(utils.getDestination(req));

            const index = context.nextProcessor?.index
            if (!index) {
                throw 'Next Processor not found!'
            } 
            req.data.Processors[index].isComplete = true 
            req.data.Processors[index].decision = req.headers.decision

            // update history
            const { History } = cds.entities
            const id = req.params[0]            
            const currentProcessor = req.data.Processors[index]
            const history = [{
                userId: currentProcessor.userId,
                comment: currentProcessor.comment,
                taskType: currentProcessor.taskType,
                completedAt: new Date(),
                decision: req.headers.decision,
                rootInstanceId: "",      
                WorkflowInstance_ID: id
            }]
            await INSERT (history) .into (History)

        } catch (err) {
            req.reject(err)
        }

    })

    this.after('UPDATE', 'WorkflowInstances', async (req) => {
        console.log('after UPDATE')
        //update history
    })     

    //Actions and Functions
    this.on('suspend', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "SUSPENDED")
    });

    this.on('resume', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "RUNNING")
    });

    this.on('cancel', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "CANCELED")
    });

    this.on('getProcessors', 'WorkflowInstances', async (req) => {
        //mock implementation
        // const { Processors } = cds.entities
        // const id = req.params[0];
        // const results =  await SELECT.from(Processors).where({WorkflowInstance_ID: id})
        // return results

        const context = await getContext(req)
        if (!context.approvalSteps) {
            req.reject('Approval Steps not found!')
        }
        
        const approvalSteps = context.approvalSteps.map((step)=>{
            return {
                userId: step.userId,
                index: step.index,
                comment: step.comment,
                taskType: step.taskType,
                isComplete: step.isComplete,
                decision: step.decision
            }
        })
        return approvalSteps
    });

    this.on('getActiveTask', 'WorkflowInstances', async (req) => {
        // mock implementation
        // const { Processors } = cds.entities
        // const id = req.params[0];
        // const results =  await SELECT.from(Processors).where({WorkflowInstance_ID: id})
        // return {
        //         taskType: results[0].taskType,
        //         index: results[0].index,
        //         userId: results[0].userId,
        //         isRequester: false
        // }

        const context = await getContext(req)
        if (!context.nextProcessor || !context.approvalSteps) {
            req.reject('nextProcessor or approvalSteps not found!')
        }
        const index = context.nextProcessor.index
        const nextProcessor = context.approvalSteps[index]
        return {
            taskType: nextProcessor.taskType,
            index: index,
            userId: nextProcessor.userId,
            isRequester: context.isRequester
        }
    })

    this.on('getWorkflowInstanceId', async (req) => {
        //mock implementation
        // const { WorkflowInstances } = cds.entities
        // const results = await SELECT.one.from(WorkflowInstances).columns`{ID, instanceId}`.where({ID: req.data.taskId})
        // if (!results) {
        //     req.reject(404, `No record found for taskId ${req.data.taskId}`)
        // }
        // return {
        //     ID: ID,
        //     instanceId: instanceId
        // };
        const taskId = req.data.taskId
        try {
            const task = await UserTaskInstancesApi.getInstance(taskId)
                            .execute(utils.getDestination(req));
            console.log("workflowInstanceId: ", task.workflowInstanceId)
            const { WorkflowInstances } = cds.entities
            const results = await SELECT.from(WorkflowInstances).columns`{ID, instanceId}`
                .where({ instanceId: task.workflowInstanceId })
            if (!results) {
                req.reject(404, `No record found for taskId ${taskId}`)
            }
            return {
                ID: results[0].ID,
                instanceId: results[0].instanceId
            }
        } catch (err) {
             req.reject(err)
         }
    })

    //complete event
    const messaging = await cds.connect.to("messaging")
    messaging.on('wfcomplete', async (msg) => {
        const message = msg.headers  
        console.log('===> Received message : ' + JSON.stringify(message))
        const instanceId = message.workflowInstanceId

        //get workflow instance
        const instance = await WorkflowInstancesApi.getInstance(instanceId)
                            .execute(getDestinationWithClientCredential());        
        console.log('===> Received instance : ' + JSON.stringify(instance))
        const { WorkflowInstances } = cds.entities
        //set 'COMPLETED', as instance is not yet updated
        const n = await UPDATE (WorkflowInstances).set({
            status: 'COMPLETED',
            completedAt: new Date()
        }).where({instanceId: instanceId})

        // //mock
        // //get workflow instance
        // const instance = {
        //     status: 'COMPLETED',
        //     // completedAt: new Date(),
        //     // completedBy: 'dummy'
        // }

        // const { WorkflowInstances } = cds.entities
        // const n = await UPDATE (WorkflowInstances).set({
        //     status: instance.status,
        //     completedAt: instance.completedAt? instance.completedAt: null,
        //     completedBy: instance.completedBy? instance.completedBy: null
        // }).where({ID: instanceId})

        const logMessage = n > 0 ? '===> Status updated' : '===> Update of status failed!'
        console.log(logMessage)
    })   

}