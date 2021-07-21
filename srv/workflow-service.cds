  
using { demo.workflow as workflow } from '../db/schema';

service WorkflowService {
    entity WorkflowInstances as projection on workflow.WorkflowInstances;
    entity Processors as projection on workflow.Processors;
    entity History as projection on workflow.History;
}