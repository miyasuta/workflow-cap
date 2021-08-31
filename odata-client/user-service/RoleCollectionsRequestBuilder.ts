/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RequestBuilder, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, CreateRequestBuilderV4, UpdateRequestBuilderV4, DeleteRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { RoleCollections } from './RoleCollections';

/**
 * Request builder class for operations supported on the [[RoleCollections]] entity.
 */
export class RoleCollectionsRequestBuilder extends RequestBuilder<RoleCollections> {
  /**
   * Returns a request builder for retrieving one `RoleCollections` entity based on its keys.
   * @param name Key property. See [[RoleCollections.name]].
   * @param roleTemplateAppId Key property. See [[RoleCollections.roleTemplateAppId]].
   * @param roleTemplateName Key property. See [[RoleCollections.roleTemplateName]].
   * @param roleName Key property. See [[RoleCollections.roleName]].
   * @returns A request builder for creating requests to retrieve one `RoleCollections` entity based on its keys.
   */
  getByKey(name: string, roleTemplateAppId: string, roleTemplateName: string, roleName: string): GetByKeyRequestBuilderV4<RoleCollections> {
    return new GetByKeyRequestBuilderV4(RoleCollections, {
      name: name,
      roleTemplateAppId: roleTemplateAppId,
      roleTemplateName: roleTemplateName,
      roleName: roleName
    });
  }

  /**
   * Returns a request builder for querying all `RoleCollections` entities.
   * @returns A request builder for creating requests to retrieve all `RoleCollections` entities.
   */
  getAll(): GetAllRequestBuilderV4<RoleCollections> {
    return new GetAllRequestBuilderV4(RoleCollections);
  }

  /**
   * Returns a request builder for creating a `RoleCollections` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `RoleCollections`.
   */
  create(entity: RoleCollections): CreateRequestBuilderV4<RoleCollections> {
    return new CreateRequestBuilderV4(RoleCollections, entity);
  }

  /**
   * Returns a request builder for updating an entity of type `RoleCollections`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `RoleCollections`.
   */
  update(entity: RoleCollections): UpdateRequestBuilderV4<RoleCollections> {
    return new UpdateRequestBuilderV4(RoleCollections, entity);
  }

  /**
   * Returns a request builder for deleting an entity of type `RoleCollections`.
   * @param name Key property. See [[RoleCollections.name]].
   * @param roleTemplateAppId Key property. See [[RoleCollections.roleTemplateAppId]].
   * @param roleTemplateName Key property. See [[RoleCollections.roleTemplateName]].
   * @param roleName Key property. See [[RoleCollections.roleName]].
   * @returns A request builder for creating requests that delete an entity of type `RoleCollections`.
   */
  delete(name: string, roleTemplateAppId: string, roleTemplateName: string, roleName: string): DeleteRequestBuilderV4<RoleCollections>;
  /**
   * Returns a request builder for deleting an entity of type `RoleCollections`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `RoleCollections` by taking the entity as a parameter.
   */
  delete(entity: RoleCollections): DeleteRequestBuilderV4<RoleCollections>;
  delete(nameOrEntity: any, roleTemplateAppId?: string, roleTemplateName?: string, roleName?: string): DeleteRequestBuilderV4<RoleCollections> {
    return new DeleteRequestBuilderV4(RoleCollections, nameOrEntity instanceof RoleCollections ? nameOrEntity : {
      name: nameOrEntity!,
      roleTemplateAppId: roleTemplateAppId!,
      roleTemplateName: roleTemplateName!,
      roleName: roleName!
    });
  }
}
