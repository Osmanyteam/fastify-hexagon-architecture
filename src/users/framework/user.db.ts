import { Model } from 'objection';
import knex from '../../shared/knex';
import type UserEntity from '../entity/user.entity';
Model.knex(knex);

interface UserDB extends UserEntity {}

class UserDB extends Model {

  static override idColumn = 'id';

  static override get tableName() {
    return 'users';
  }

  static override get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default UserDB;
