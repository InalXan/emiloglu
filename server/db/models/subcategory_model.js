import mongoose from 'mongoose'

const SubcategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  title: { type: String, required: true },
  description: { type: String },
  name: { type: String, required: true },
})

export const Subcategory = mongoose.model('Subcategory', SubcategorySchema)
