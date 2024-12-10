import { model, Schema } from 'mongoose'

const sponsorSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
})

const Sponsortwo = model('Sponsortwo', sponsorSchema)

export default Sponsortwo
