/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { UsersRequestBuilder } from './UsersRequestBuilder';
import { Moment } from 'moment';
import { AllFields, CustomFieldV4, DateField, EntityBuilderType, EntityV4, Field, StringField } from '@sap-cloud-sdk/core';

/**
 * This class represents the entity "Users" of service "UserService".
 */
export class Users extends EntityV4 implements UsersType {
  /**
   * Technical entity name for Users.
   */
  static _entityName = 'Users';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for Users.
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
   * Id.
   */
  id!: string;
  /**
   * External Id.
   * @nullable
   */
  externalId?: string;
  /**
   * User Name.
   * @nullable
   */
  userName?: string;
  /**
   * Family Name.
   * @nullable
   */
  familyName?: string;
  /**
   * Given Name.
   * @nullable
   */
  givenName?: string;

  /**
   * Returns an entity builder to construct instances of `Users`.
   * @returns A builder that constructs instances of entity type `Users`.
   */
  static builder(): EntityBuilderType<Users, UsersType> {
    return EntityV4.entityBuilder(Users);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Users` entity type.
   * @returns A `Users` request builder.
   */
  static requestBuilder(): UsersRequestBuilder {
    return new UsersRequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Users`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Users`.
   */
  static customField(fieldName: string): CustomFieldV4<Users> {
    return EntityV4.customFieldSelector(fieldName, Users);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface UsersType {
  createdAt?: Moment | null;
  createdBy?: string | null;
  modifiedAt?: Moment | null;
  modifiedBy?: string | null;
  id: string;
  externalId?: string | null;
  userName?: string | null;
  familyName?: string | null;
  givenName?: string | null;
}

export namespace Users {
  /**
   * Static representation of the [[createdAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_AT: DateField<Users> = new DateField('createdAt', Users, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[createdBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const CREATED_BY: StringField<Users> = new StringField('createdBy', Users, 'Edm.String');
  /**
   * Static representation of the [[modifiedAt]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_AT: DateField<Users> = new DateField('modifiedAt', Users, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[modifiedBy]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const MODIFIED_BY: StringField<Users> = new StringField('modifiedBy', Users, 'Edm.String');
  /**
   * Static representation of the [[id]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const ID: StringField<Users> = new StringField('id', Users, 'Edm.Guid');
  /**
   * Static representation of the [[externalId]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const EXTERNAL_ID: StringField<Users> = new StringField('externalId', Users, 'Edm.String');
  /**
   * Static representation of the [[userName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const USER_NAME: StringField<Users> = new StringField('userName', Users, 'Edm.String');
  /**
   * Static representation of the [[familyName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FAMILY_NAME: StringField<Users> = new StringField('familyName', Users, 'Edm.String');
  /**
   * Static representation of the [[givenName]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GIVEN_NAME: StringField<Users> = new StringField('givenName', Users, 'Edm.String');
  /**
   * All fields of the Users entity.
   */
  export const _allFields: Array<DateField<Users> | StringField<Users>> = [
    Users.CREATED_AT,
    Users.CREATED_BY,
    Users.MODIFIED_AT,
    Users.MODIFIED_BY,
    Users.ID,
    Users.EXTERNAL_ID,
    Users.USER_NAME,
    Users.FAMILY_NAME,
    Users.GIVEN_NAME
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Users> = new AllFields('*', Users);
  /**
   * All key fields of the Users entity.
   */
  export const _keyFields: Array<Field<Users>> = [Users.ID];
  /**
   * Mapping of all key field names to the respective static field property Users.
   */
  export const _keys: { [keys: string]: Field<Users> } = Users._keyFields.reduce((acc: { [keys: string]: Field<Users> }, field: Field<Users>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
