/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RolesRequestBuilder } from './RolesRequestBuilder';
import { Moment } from 'moment';
import { AllFields, CustomFieldV4, DateField, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Roles" of service "UserService".
 */
export class Roles extends EntityV4 implements RolesType {
  /**
   * Technical entity name for Roles.
   */
  static _entityName = 'Roles';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Roles.
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
   * Role Template Name.
   */
  roleTemplateName!: string;
  /**
   * Role Template App Id.
   */
  roleTemplateAppId!: string;
  /**
   * Role Name.
   */
  roleName!: string;
  /**
   * Scope Name.
   */
  scopeName!: string;

  /**
   * Returns an entity builder to construct instances of `Roles`.
   * @returns A builder that constructs instances of entity type `Roles`.
   */
  static builder(): EntityBuilderType<Roles, RolesType> {
    return EntityV4.entityBuilder(Roles);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Roles` entity type.
   * @returns A `Roles` request builder.
   */
  static requestBuilder(): RolesRequestBuilder {
    return new RolesRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Roles`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Roles`.
   */
  static customField(fieldName: string): CustomFieldV4<Roles> {
    return EntityV4.customFieldSelector(fieldName, Roles);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface RolesType {
  createdAt?: Moment | null;
  createdBy?: string | null;
  modifiedAt?: Moment | null;
  modifiedBy?: string | null;
  roleTemplateName: string;
  roleTemplateAppId: string;
  roleName: string;
  scopeName: string;
}

export namespace Roles {
  /**
   * Static representation of the [[createdAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_AT: DateField<Roles> = new DateField('createdAt', Roles, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[createdBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_BY: StringField<Roles> = new StringField('createdBy', Roles, 'Edm.String');
  /**
   * Static representation of the [[modifiedAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_AT: DateField<Roles> = new DateField('modifiedAt', Roles, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[modifiedBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_BY: StringField<Roles> = new StringField('modifiedBy', Roles, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_NAME: StringField<Roles> = new StringField('roleTemplateName', Roles, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateAppId]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_APP_ID: StringField<Roles> = new StringField('roleTemplateAppId', Roles, 'Edm.String');
  /**
   * Static representation of the [[roleName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_NAME: StringField<Roles> = new StringField('roleName', Roles, 'Edm.String');
  /**
   * Static representation of the [[scopeName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCOPE_NAME: StringField<Roles> = new StringField('scopeName', Roles, 'Edm.String');
  /**
   * All fields of the Roles entity.
   */
  export const _allFields: Array<DateField<Roles> | StringField<Roles>> = [
    Roles.CREATED_AT,
    Roles.CREATED_BY,
    Roles.MODIFIED_AT,
    Roles.MODIFIED_BY,
    Roles.ROLE_TEMPLATE_NAME,
    Roles.ROLE_TEMPLATE_APP_ID,
    Roles.ROLE_NAME,
    Roles.SCOPE_NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Roles> = new AllFields('*', Roles);
  /**
   * All key fields of the Roles entity.
   */
  export const _keyFields: Array<Field<Roles>> = [Roles.ROLE_TEMPLATE_NAME, Roles.ROLE_TEMPLATE_APP_ID, Roles.ROLE_NAME, Roles.SCOPE_NAME];
  /**
   * Mapping of all key field names to the respective static field property Roles.
   */
  export const _keys: { [keys: string]: Field<Roles> } = Roles._keyFields.reduce((acc: { [keys: string]: Field<Roles> }, field: Field<Roles>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
