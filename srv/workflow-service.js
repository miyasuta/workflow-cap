const cds = require('@sap/cds')
const { WorkflowInstancesApi, UserTaskInstancesApi } = require('@sap/cloud-sdk-workflow-service-cf')
const destination = { destinationName: 'Workflow-Api' }

const updateStatus = async function (req, status) {
    //get workflow instance id
    const { WorkflowInstances } = cds.entities
    const id = req.params[0];
    const { instanceId } = await SELECT.one.from(WorkflowInstances)
        .columns`{instanceId}`.where({ ID: id })
    if (!instanceId) {
        req.err(404, 'indstancdId not found!')
    }

    const body = {
        status: status,
        cascade: false
    };

    try {
        await WorkflowInstancesApi.updateInstance(
            instanceId,
            body,
        ).execute(destination);
    } catch (err) {
        req.reject(err)
    }

    //update DB status
    const n = await UPDATE(WorkflowInstances).set({ status: status }).where({ ID: id })
    n > 0 || req.err(500, 'Update of CAP status failed!')
}

module.exports = function () {

    this.before('CREATE', 'WorkflowInstances', async (req) => {
        if (req.headers.decision) {
            return
        }

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
            const instance = await WorkflowInstancesApi.startInstance({
                definitionId: 'multilevelapproval',
                context: context,
            }).execute(destination);

            //set instance info
            req.data.instanceId = instance.id
            req.data.startedAt = instance.startedAt
            req.data.startedBy = instance.startedBy
            req.data.status = instance.status

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

        const updateContext = {
            subject: req.data.subject,
            decision: req.headers.decision,
            approvalSteps: approvalSteps
        }

        try {
            // get current context
            const { WorkflowInstances, History } = cds.entities
            const id = req.params[0]
            const result = await SELECT.one.from(WorkflowInstances).columns(`{instanceId}`).where({ID: id})
            if (!result || !result.instanceId) {
                throw 'InstanceId not found!'
            }       
            const workflowInstanceID = result.instanceId
            const context = await WorkflowInstancesApi.getInstanceContext(workflowInstanceID).execute(destination)
            console.log("context: ", JSON.stringify(context))
            const index = context.nextProcessor?.index
            if (!index) {
                throw 'Next Processor not found!'
            }

            //udate task
            await UserTaskInstancesApi.updateInstance(req.headers.taskinstanceid, {
                context: updateContext,
                status: 'COMPLETED',
            }).execute(destination);

            //update "isComplete"
            req.data.Processors[index].isComplete = true 
            req.data.Processors[index].decision = req.headers.decision           

            // update history
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

    this.before('UPDATE', 'Processors', async (req) => {
        console.log("UPDATE:Processors")
    })   
    
    this.before('CREATE', 'Processors', async (req) => {
        console.log("CREATE:Processors", JSON.stringify(req.data))
    })      

    this.on('suspend', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "SUSPENDED")
    });

    this.on('resume', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "RUNNING")
    });

    this.on('cancel', 'WorkflowInstances', async (req) => {
        return updateStatus(req, "COMPLETED")
    });

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
            const task = await UserTaskInstancesApi.getInstance(taskId).execute(destination);
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

}