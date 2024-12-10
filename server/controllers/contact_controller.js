import Contact from "../db/models/contact_model.js";

export const sendMessage = async (req, res) => {
  try {
      const { name, phone, message } = req.body;
      const newContact = new Contact({ name, phone, message });
      await newContact.save();
      res.status(201).json({ message: 'Mesaj başarıyla kaydedildi' });
  } catch (error) {
      res.status(500).json({ error: 'Mesaj kaydedilemedi' });
  }
}

export const getMessages = async (req, res) => {
  try {
      const contacts = await Contact.find();
      res.json(contacts);
  } catch (error) {
      res.status(500).json({ error: 'Veriler getirilemedi' });
  }
}

export const deleteMessage = async (req, res) => {
  try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: 'Mesaj başarıyla silindi' });
  } catch (error) {
      res.status(500).json({ error: 'Mesaj silinemedi' });
  }
}
