import { Schema, Document, model } from 'mongoose'
import { UsersSchema } from '../../types/models/Users'

const collection = 'Users'

export interface UsersSchemaWithDocument extends UsersSchema, Document {
  // add more something here
}

const usersSchema = new Schema<UsersSchemaWithDocument>({
  username: {
    type: 'string',
    required: true,
    unique: true
  },
  password: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true,
    unique: true
  },
  name: {
    type: 'string'
  },
  surname: {
    type: 'string'
  }
}, {
  collection,
  versionKey: false, // disable __v
  timestamps: true // auto generate createdAt and updatedAt
})

export default model(collection, usersSchema)