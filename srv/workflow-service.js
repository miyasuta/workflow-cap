const cds = require('@sap/cds')
const { WorkflowInstancesApi } = require('@sap/cloud-sdk-workflow-service-cf')
const destination = { destinationName: 'Workflow-Api' }

const updateStatus = async function (req, status) {
        //get workflow instance id
        const { WorkflowInstances } = cds.entities
        const id = req.params[0];
        const { instanceId } = await SELECT.one.from(WorkflowInstances)
                                    .columns`{instanceId}`.where({ID: id})
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
        const n = await UPDATE(WorkflowInstances).set({status: status}).where({ID: id})
        n > 0 || req.err(500, 'Update of CAP status failed!')
}

module.exports = function () {

    this.before('CREATE', 'WorkflowInstances', async (req) => {
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
            }`.where({WorkflowInstance_ID: req.data.referenceId}) 

            history = result.map((data)=>{
                return {
                    userId: data.userId,
                    comment: data.comment,
                    taskType: data.taskType,
                    completedAt: data.completedAt,
                    decision: data.decision,
                    rootInstanceId: req.data.referenceId                
                }
            });         
        }

        //start workflow
        const approvalSteps = req.data.Processors.map((processor)=>{
            return {
                taskType: processor.taskType,
                decision: processor.decision,
                index: processor.index,
                comment: processor.comment,
                userId: processor.userId,
                isComplete : processor.isComplete           
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
                requester = req.data.Processors.find((processor)=>{
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

    this.on('suspend', 'WorkflowInstances', async(req) => {
        return updateStatus(req, "SUSPENDED")
    });

    this.on('resume', 'WorkflowInstances', async(req) => {
        return updateStatus(req, "RUNNING")
    });
    
    this.on('cancel', 'WorkflowInstances', async(req) => {
        return updateStatus(req, "COMPLETED")
    });    

}