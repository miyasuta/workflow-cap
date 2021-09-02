using { cuid, managed, sap } from '@sap/cds/common';
namespace demo.workflow;

entity WorkflowInstances: cuid, managed {
    businessKey: String;
    instanceId: UUID;
    objectId: Integer;
    subject: String;
    status: String;
    requester: String;
    referenceId: UUID;
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
    decision: String;
    WorkflowInstance: Association to WorkflowInstances;
}

entity History: cuid, managed {
    userId: String;
    comment: String;
    taskType: String;
    completedAt: DateTime;
    decision: String;
    rootInstanceId: UUID;
    WorkflowInstance: Association to WorkflowInstances;    
}

type Task: {
    taskType: String;
    index: Integer;
    userId: String;
    isRequester: Boolean;
}