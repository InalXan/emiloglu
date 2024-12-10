import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
})

export const Category = model('Category', CategorySchema)
