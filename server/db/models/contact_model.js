import {Schema, model} from "mongoose";

const ContactSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = model('Contact', ContactSchema);

export default Contact;
