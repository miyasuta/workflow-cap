  
using { demo.workflow as workflow } from '../db/schema';

@requires: 'authenticated-user'
service WorkflowService {
    entity WorkflowInstances as projection on workflow.WorkflowInstances
        actions {
            action suspend();
            action resume();
            action cancel();
            function getProcessors() returns array of Processors
        };
    entity Processors as projection on workflow.Processors;
    entity History as projection on workflow.History;
    
    function getWorkflowInstanceId (taskId: UUID) 
    returns {
        ID: WorkflowInstances:ID;
        instanceId: WorkflowInstances:instanceId;
    };
    
}