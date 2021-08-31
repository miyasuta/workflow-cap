/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { ScopesRequestBuilder } from './ScopesRequestBuilder';
import { AllFields, CustomFieldV4, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Scopes" of service "UserService".
 */
export class Scopes extends EntityV4 implements ScopesType {
  /**
   * Technical entity name for Scopes.
   */
  static _entityName = 'Scopes';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Scopes.
   */
  static _serviceName = 'UserService';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'VALUE_IS_UNDEFINED';
  /**
   * Name.
   */
  name!: string;
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
   * Returns an entity builder to construct instances of `Scopes`.
   * @returns A builder that constructs instances of entity type `Scopes`.
   */
  static builder(): EntityBuilderType<Scopes, ScopesType> {
    return EntityV4.entityBuilder(Scopes);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Scopes` entity type.
   * @returns A `Scopes` request builder.
   */
  static requestBuilder(): ScopesRequestBuilder {
    return new ScopesRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Scopes`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Scopes`.
   */
  static customField(fieldName: string): CustomFieldV4<Scopes> {
    return EntityV4.customFieldSelector(fieldName, Scopes);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface ScopesType {
  name: string;
  roleTemplateName: string;
  roleTemplateAppId: string;
  roleName: string;
  scopeName: string;
}

export namespace Scopes {
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const NAME: StringField<Scopes> = new StringField('name', Scopes, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_NAME: StringField<Scopes> = new StringField('roleTemplateName', Scopes, 'Edm.String');
  /**
   * Static representation of the [[roleTemplateAppId]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_TEMPLATE_APP_ID: StringField<Scopes> = new StringField('roleTemplateAppId', Scopes, 'Edm.String');
  /**
   * Static representation of the [[roleName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ROLE_NAME: StringField<Scopes> = new StringField('roleName', Scopes, 'Edm.String');
  /**
   * Static representation of the [[scopeName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SCOPE_NAME: StringField<Scopes> = new StringField('scopeName', Scopes, 'Edm.String');
  /**
   * All fields of the Scopes entity.
   */
  export const _allFields: Array<StringField<Scopes>> = [
    Scopes.NAME,
    Scopes.ROLE_TEMPLATE_NAME,
    Scopes.ROLE_TEMPLATE_APP_ID,
    Scopes.ROLE_NAME,
    Scopes.SCOPE_NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Scopes> = new AllFields('*', Scopes);
  /**
   * All key fields of the Scopes entity.
   */
  export const _keyFields: Array<Field<Scopes>> = [Scopes.NAME, Scopes.ROLE_TEMPLATE_NAME, Scopes.ROLE_TEMPLATE_APP_ID, Scopes.ROLE_NAME, Scopes.SCOPE_NAME];
  /**
   * Mapping of all key field names to the respective static field property Scopes.
   */
  export const _keys: { [keys: string]: Field<Scopes> } = Scopes._keyFields.reduce((acc: { [keys: string]: Field<Scopes> }, field: Field<Scopes>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
