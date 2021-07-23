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
        //start workflow
        const context = {
            requestId: req.data.businessKey,
            requester: req.data.requester,
            subject: req.data.subject,
            approvalSteps: req.data.Processors
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