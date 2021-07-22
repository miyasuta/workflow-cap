const cds = require('@sap/cds')
const {WorkflowInstancesApi} = require('@sap/cloud-sdk-workflow-service-cf')
const destination = { destinationName: 'Workflow-Api' }

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

}