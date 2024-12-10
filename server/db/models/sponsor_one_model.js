import { model, Schema } from 'mongoose'

const sponsorSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
})

const Sponsorone = model('Sponsorone', sponsorSchema)

export default Sponsorone
