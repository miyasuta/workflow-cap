/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { Roles } from './Roles';

/**
 * Request builder class for operations supported on the [[Roles]] entity.
 */
export class RolesRequestBuilder extends RequestBuilder<Roles> {
  /**
   * Returns a request builder for retrieving one `Roles` entity based on its keys.
   * @param roleTemplateName Key property. See [[Roles.roleTemplateName]].
   * @param roleTemplateAppId Key property. See [[Roles.roleTemplateAppId]].
   * @param roleName Key property. See [[Roles.roleName]].
   * @param scopeName Key property. See [[Roles.scopeName]].
   * @returns A request builder for creating requests to retrieve one `Roles` entity based on its keys.
   */
  getByKey(roleTemplateName: string, roleTemplateAppId: string, roleName: string, scopeName: string): GetByKeyRequestBuilderV4<Roles> {
    return new GetByKeyRequestBuilderV4(Roles, {
      roleTemplateName: roleTemplateName,
      roleTemplateAppId: roleTemplateAppId,
      roleName: roleName,
      scopeName: scopeName
    });
  }

  /**
   * Returns a request builder for querying all `Roles` entities.
   * @returns A request builder for creating requests to retrieve all `Roles` entities.
   */
  getAll(): GetAllRequestBuilderV4<Roles> {
    return new GetAllRequestBuilderV4(Roles);
  }

  /**
   * Returns a request builder for creating a `Roles` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Roles`.
   */
  create(entity: Roles): CreateRequestBuilderV4<Roles> {
    return new CreateRequestBuilderV4(Roles, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Roles`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Roles`.
   */
  update(entity: Roles): UpdateRequestBuilderV4<Roles> {
    return new UpdateRequestBuilderV4(Roles, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Roles`.
   * @param roleTemplateName Key property. See [[Roles.roleTemplateName]].
   * @param roleTemplateAppId Key property. See [[Roles.roleTemplateAppId]].
   * @param roleName Key property. See [[Roles.roleName]].
   * @param scopeName Key property. See [[Roles.scopeName]].
   * @returns A request builder for creating requests that delete an entity of type `Roles`.
   */
  delete(roleTemplateName: string, roleTemplateAppId: string, roleName: string, scopeName: string): DeleteRequestBuilderV4<Roles>;
  /**
   * Returns a request builder for deleting an entity of type `Roles`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Roles` by taking the entity as a parameter.
   */
  delete(entity: Roles): DeleteRequestBuilderV4<Roles>;
  delete(roleTemplateNameOrEntity: any, roleTemplateAppId?: string, roleName?: string, scopeName?: string): DeleteRequestBuilderV4<Roles> {
    return new DeleteRequestBuilderV4(Roles, roleTemplateNameOrEntity instanceof Roles ? roleTemplateNameOrEntity : {
      roleTemplateName: roleTemplateNameOrEntity!,
      roleTemplateAppId: roleTemplateAppId!,
      roleName: roleName!,
      scopeName: scopeName!
    });
  }
}
