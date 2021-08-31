/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { Scopes } from './Scopes';

/**
 * Request builder class for operations supported on the [[Scopes]] entity.
 */
export class ScopesRequestBuilder extends RequestBuilder<Scopes> {
  /**
   * Returns a request builder for retrieving one `Scopes` entity based on its keys.
   * @param name Key property. See [[Scopes.name]].
   * @param roleTemplateName Key property. See [[Scopes.roleTemplateName]].
   * @param roleTemplateAppId Key property. See [[Scopes.roleTemplateAppId]].
   * @param roleName Key property. See [[Scopes.roleName]].
   * @param scopeName Key property. See [[Scopes.scopeName]].
   * @returns A request builder for creating requests to retrieve one `Scopes` entity based on its keys.
   */
  getByKey(name: string, roleTemplateName: string, roleTemplateAppId: string, roleName: string, scopeName: string): GetByKeyRequestBuilderV4<Scopes> {
    return new GetByKeyRequestBuilderV4(Scopes, {
      name: name,
      roleTemplateName: roleTemplateName,
      roleTemplateAppId: roleTemplateAppId,
      roleName: roleName,
      scopeName: scopeName
    });
  }

  /**
   * Returns a request builder for querying all `Scopes` entities.
   * @returns A request builder for creating requests to retrieve all `Scopes` entities.
   */
  getAll(): GetAllRequestBuilderV4<Scopes> {
    return new GetAllRequestBuilderV4(Scopes);
  }

  /**
   * Returns a request builder for creating a `Scopes` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Scopes`.
   */
  create(entity: Scopes): CreateRequestBuilderV4<Scopes> {
    return new CreateRequestBuilderV4(Scopes, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `Scopes`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Scopes`.
   */
  update(entity: Scopes): UpdateRequestBuilderV4<Scopes> {
    return new UpdateRequestBuilderV4(Scopes, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `Scopes`.
   * @param name Key property. See [[Scopes.name]].
   * @param roleTemplateName Key property. See [[Scopes.roleTemplateName]].
   * @param roleTemplateAppId Key property. See [[Scopes.roleTemplateAppId]].
   * @param roleName Key property. See [[Scopes.roleName]].
   * @param scopeName Key property. See [[Scopes.scopeName]].
   * @returns A request builder for creating requests that delete an entity of type `Scopes`.
   */
  delete(name: string, roleTemplateName: string, roleTemplateAppId: string, roleName: string, scopeName: string): DeleteRequestBuilderV4<Scopes>;
  /**
   * Returns a request builder for deleting an entity of type `Scopes`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Scopes` by taking the entity as a parameter.
   */
  delete(entity: Scopes): DeleteRequestBuilderV4<Scopes>;
  delete(nameOrEntity: any, roleTemplateName?: string, roleTemplateAppId?: string, roleName?: string, scopeName?: string): DeleteRequestBuilderV4<Scopes> {
    return new DeleteRequestBuilderV4(Scopes, nameOrEntity instanceof Scopes ? nameOrEntity : {
      name: nameOrEntity!,
      roleTemplateName: roleTemplateName!,
      roleTemplateAppId: roleTemplateAppId!,
      roleName: roleName!,
      scopeName: scopeName!
    });
  }
}
