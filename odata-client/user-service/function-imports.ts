/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEdmTypeV4, edmToTsV4, FunctionImportRequestBuilderV4, FunctionImportParameter } from '@sap-cloud-sdk/core';

/**
 * Type of the parameters to be passed to [[userHasScope]].
 */
export interface UserHasScopeParameters {
  /**
   * User Id.
   */
  userId: string;
  /**
   * Scope.
   */
  scope: string;
}

/**
 * User Has Scope.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function userHasScope(parameters: UserHasScopeParameters): FunctionImportRequestBuilderV4<UserHasScopeParameters, boolean> {
  const params = {
    userId: new FunctionImportParameter('userId', 'Edm.String', parameters.userId),
    scope: new FunctionImportParameter('scope', 'Edm.String', parameters.scope)
  }

  return new FunctionImportRequestBuilderV4('VALUE_IS_UNDEFINED', 'userHasScope', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.Boolean')), params);
}

export const functionImports = {
  userHasScope
};
