using { cuid, managed, sap } from '@sap/cds/common';
namespace demo.workflow;

entity WorkflowInstances: cuid, managed {
    businessKey: String;
    instanceId: UUID;
    status: String;
    requester: String;
    startedAt: DateTime;
    startedBy: String;
    completedAt: DateTime;
    completedBy: String;
    Processors: Composition of many Processors on Processors.WorkflowInstance=$self;
    History: Composition of many History on History.WorkflowInstance=$self;
}

entity Processors: cuid, managed {
    userId: String;
    index: Integer;
    comment: String;
    taskType: String;
    isComplete: Boolean;
    WorkflowInstance: Association to WorkflowInstances;
}

entity History: cuid, managed {
    userId: String;
    comment: String;
    taskType: String;
    completedAt: DateTime;
    WorkflowInstance: Association to WorkflowInstances;    
}