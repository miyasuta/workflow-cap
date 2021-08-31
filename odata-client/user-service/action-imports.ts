/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEdmTypeV4, edmToTsV4, ActionImportRequestBuilder, ActionImportParameter } from '@sap-cloud-sdk/core';

/**
 * Type of the parameters to be passed to [[loadUsers]].
 */
export interface LoadUsersParameters {
}

/**
 * Load Users.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function loadUsers(parameters: LoadUsersParameters): ActionImportRequestBuilder<LoadUsersParameters, string> {
  const params = {

  }

  return new ActionImportRequestBuilder('VALUE_IS_UNDEFINED', 'loadUsers', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

/**
 * Type of the parameters to be passed to [[loadRoleCollections]].
 */
export interface LoadRoleCollectionsParameters {
}

/**
 * Load Role Collections.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function loadRoleCollections(parameters: LoadRoleCollectionsParameters): ActionImportRequestBuilder<LoadRoleCollectionsParameters, string> {
  const params = {

  }

  return new ActionImportRequestBuilder('VALUE_IS_UNDEFINED', 'loadRoleCollections', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

/**
 * Type of the parameters to be passed to [[loadRoles]].
 */
export interface LoadRolesParameters {
}

/**
 * Load Roles.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function loadRoles(parameters: LoadRolesParameters): ActionImportRequestBuilder<LoadRolesParameters, string> {
  const params = {

  }

  return new ActionImportRequestBuilder('VALUE_IS_UNDEFINED', 'loadRoles', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

export const actionImports = {
  loadUsers,
  loadRoleCollections,
  loadRoles
};
