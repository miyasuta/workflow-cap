/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Users, RoleCollections, Roles, Scopes } from './index';

/**
 * Batch builder for operations supported on the User Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadUserServiceRequestBuilder | ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(requests: Array<ReadUserServiceRequestBuilder | ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
export function batch(first: undefined | ReadUserServiceRequestBuilder | ODataBatchChangeSetV4<WriteUserServiceRequestBuilder> | Array<ReadUserServiceRequestBuilder | ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>>, ...rest: Array<ReadUserServiceRequestBuilder | ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>>): ODataBatchRequestBuilderV4 {
  return new ODataBatchRequestBuilderV4(defaultUserServicePath, variadicArgumentToArray(first, rest), map);
}

/**
 * Change set constructor consists of write operations supported on the User Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: Array<WriteUserServiceRequestBuilder>): ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>;
export function changeset(requests: Array<WriteUserServiceRequestBuilder>): ODataBatchChangeSetV4<WriteUserServiceRequestBuilder>;
export function changeset(first: undefined | WriteUserServiceRequestBuilder | Array<WriteUserServiceRequestBuilder>, ...rest: Array<WriteUserServiceRequestBuilder>): ODataBatchChangeSetV4<WriteUserServiceRequestBuilder> {
  return new ODataBatchChangeSetV4(variadicArgumentToArray(first, rest));
}

export const defaultUserServicePath = 'VALUE_IS_UNDEFINED';
const map = { 'Users': Users, 'RoleCollections': RoleCollections, 'Roles': Roles, 'Scopes': Scopes };
export type ReadUserServiceRequestBuilder = GetAllRequestBuilderV4<Users> | GetAllRequestBuilderV4<RoleCollections> | GetAllRequestBuilderV4<Roles> | GetAllRequestBuilderV4<Scopes> | GetByKeyRequestBuilderV4<Users> | GetByKeyRequestBuilderV4<RoleCollections> | GetByKeyRequestBuilderV4<Roles> | GetByKeyRequestBuilderV4<Scopes>;
export type WriteUserServiceRequestBuilder = CreateRequestBuilderV4<Users> | UpdateRequestBuilderV4<Users> | DeleteRequestBuilderV4<Users> | CreateRequestBuilderV4<RoleCollections> | UpdateRequestBuilderV4<RoleCollections> | DeleteRequestBuilderV4<RoleCollections> | CreateRequestBuilderV4<Roles> | UpdateRequestBuilderV4<Roles> | DeleteRequestBuilderV4<Roles> | CreateRequestBuilderV4<Scopes> | UpdateRequestBuilderV4<Scopes> | DeleteRequestBuilderV4<Scopes>;
