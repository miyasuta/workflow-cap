/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RoleCollectionsRequestBuilder } from './RoleCollectionsRequestBuilder';
import { Moment } from 'moment';
import { AllFields, CustomFieldV4, DateField, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "RoleCollections" of service "UserService".
 */
export class RoleCollections extends EntityV4 implements RoleCollectionsType {
  /**
   * Technical entity name for RoleCollections.
   */
  static _entityName = 'RoleCollections';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for RoleCollections.
   */
  static _serviceName = 'UserService';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'VALUE_IS_UNDEFINED';
  /**
   * Created At.
   * @nullable
   */
  createdAt?: Moment;
  /**
   * Created By.
   * Maximum length: 255.
   * @nullable
   */
  createdBy?: string;
  /**
   * Modified At.
   * @nullable
   */
  modifiedAt?: Moment;
  /**
   * Modified By.
   * Maximum length: 255.
   * @nullable
   */
  modifiedBy?: string;
  /**
   * Name.
   */
  name!: string;
  /**
   * Role Template App Id.
   */
  roleTemplateAppId!: string;
  /**
   * Role Template Name.
   */
  roleTemplateName!: string;
  /**
   * Role Name.
   */
  roleName!: string;

  /**
   * Returns an entity builder to construct instances of `RoleCollections`.
   * @returns A builder that constructs instances of entity type `RoleCollections`.
   */
  static builder(): EntityBuilderType<RoleCollections, RoleCollectionsType> {
    return EntityV4.entityBuilder(RoleCollections);
  }

  /**
   * Returns a request builder to construct requests for operations on the `RoleCollections` entity type.
   * @returns A `RoleCollections` request builder.
   */
  static requestBuilder(): RoleCollectionsRequestBuilder {
    return new RoleCollectionsRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `RoleCollections`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `RoleCollections`.
   */
  static customField(fieldName: string): CustomFieldV4<RoleCollections> {
    return EntityV4.customFieldSelector(fieldName, RoleCollections);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface RoleCollectionsType {
  createdAt?: Moment | null;
  createdBy?: string | null;
  modifiedAt?: Moment | null;
  modifiedBy?: string | null;
  name: string;
  roleTemplateAppId: string;
  roleTemplateName: string;
  roleName: string;
}

export namespace RoleCollections {
  /**
   * Static representation of the [[createdAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_AT: DateField<RoleCollections> = new DateField('createdAt', RoleCollections, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[createdBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_BY: StringField<RoleCollections> = new StringField('createdBy', RoleCollections, 'Edm.String');
  /**
   * Static representation of the [[modifiedAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_AT: DateField<RoleCollections> = new DateField('modifiedAt', RoleCollections, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[modifiedBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_BY: StringField<RoleCollections> = new StringField('modifiedBy', RoleCollections, 'Edm.String');
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<RoleCollections> = new StringField('name', RoleCollections, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateAppId]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_APP_ID: StringField<RoleCollections> = new StringField('roleTemplateAppId', RoleCollections, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_NAME: StringField<RoleCollections> = new StringField('roleTemplateName', RoleCollections, 'Edm.String');
  /**
   * Static representation of the [[roleName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_NAME: StringField<RoleCollections> = new StringField('roleName', RoleCollections, 'Edm.String');
  /**
   * All fields of the RoleCollections entity.
   */
  export const _allFields: Array<DateField<RoleCollections> | StringField<RoleCollections>> = [
    RoleCollections.CREATED_AT,
    RoleCollections.CREATED_BY,
    RoleCollections.MODIFIED_AT,
    RoleCollections.MODIFIED_BY,
    RoleCollections.NAME,
    RoleCollections.ROLE_TEMPLATE_APP_ID,
    RoleCollections.ROLE_TEMPLATE_NAME,
    RoleCollections.ROLE_NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<RoleCollections> = new AllFields('*', RoleCollections);
  /**
   * All key fields of the RoleCollections entity.
   */
  export const _keyFields: Array<Field<RoleCollections>> = [RoleCollections.NAME, RoleCollections.ROLE_TEMPLATE_APP_ID, RoleCollections.ROLE_TEMPLATE_NAME, RoleCollections.ROLE_NAME];
  /**
   * Mapping of all key field names to the respective static field property RoleCollections.
   */
  export const _keys: { [keys: string]: Field<RoleCollections> } = RoleCollections._keyFields.reduce((acc: { [keys: string]: Field<RoleCollections> }, field: Field<RoleCollections>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
