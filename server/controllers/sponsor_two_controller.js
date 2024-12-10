import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import Sponsortwo from '../db/models/sponsor_two_model.js'

export const addSponsortwo = async (req, res) => {
  try {
    const { name } = req.body

    if (!req.file) {
      return res.status(400).json({ error: 'Resim dosyası gerekli.' })
    }

    const image = `http://localhost:5000/uploads/sponsors/${req.file.filename}`

    const sponsor = new Sponsortwo({ name, image })
    await sponsor.save()

    res.status(201).json(sponsor)
  } catch (error) {
    console.error('Sponsor ekleme hatası:', error.message)
    res.status(500).json({ error: 'Sponsor eklenirken bir hata oluştu.' })
  }
}

export const getSponsortwo = async (req, res) => {
  try {
    const sponsors = await Sponsortwo.find()

    if (sponsors.length === 0) {
      return res.status(404).json({ message: 'Henüz sponsor eklenmemiş.' })
    }

    res.status(200).json(sponsors)
  } catch (error) {
    console.error('Sponsor listeleme hatası:', error.message)
    res.status(500).json({ error: 'Sponsor alınırken bir hata oluştu.' })
  }
}

export const deleteSponsortwo = async (req, res) => {
  try {
    const sponsor = await Sponsortwo.findById(req.params.id)

    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor bulunamadı.' })
    }

    const filePath = path.join(process.cwd(), 'uploads/sponsors', path.basename(sponsor.image))
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    await Sponsortwo.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Sponsor başarıyla silindi.' })
  } catch (error) {
    console.error('Sponsor silme hatası:', error.message)
    res.status(500).json({ error: 'Sponsor silinirken bir hata oluştu.' })
  }
}

export const updateSponsortwo = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Geçersiz sponsor ID'si." })
  }

  if (!name) {
    return res.status(400).json({ error: 'Name alanı zorunludur.' })
  }

  try {
    const sponsor = await Sponsortwo.findById(id)

    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor bulunamadı.' })
    }

    let updatedImage = sponsor.image
    if (req.file) {
      const filePath = path.join(process.cwd(), 'uploads/sponsors', path.basename(sponsor.image))
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      updatedImage = `http://localhost:5000/uploads/sponsors/${req.file.filename}`
    }

    const updatedSponsor = await Sponsortwo.findByIdAndUpdate(
      id,
      { name, image: updatedImage },
      { new: true },
    )

    res.status(200).json(updatedSponsor)
  } catch (error) {
    console.error('Sponsor güncelleme hatası:', error.message)
    res.status(500).json({ error: 'Sponsor güncellenirken bir hata oluştu.' })
  }
}
