import * as _ from 'lodash';

export const userValidationSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string', format: 'uuid' },
    email: { type: 'string', format: 'email' },
    username: { type: 'string' },
    password: { type: 'string' },
  },
  additionalProperties: false,
  required: ['email', 'username'],
}

export const createUserValidationSchema = {
  ...userValidationSchema,
  properties: _.omit(userValidationSchema.properties, ['_id']),
  required: ['email', 'username', 'password'],
}
