import { Category } from '../db/models/category_model.js'

// Yeni kategori oluştur
export const createCategory = async (req, res) => {
  try {
    const { title, description } = req.body
    let image = req.file ? `/uploads/product/${req.file.filename}` : null

    const category = new Category({ title, description, image })
    await category.save()
    res.status(201).json({ success: true, message: 'Kategori oluşturuldu', category })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Kategori oluşturulamadı', error })
  }
}

// Tüm kategorileri getir
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean()
    res.status(200).json({ success: true, categories })
  } catch (error) {
    console.error('Kategoriler getirilemedi:', error)
    res.status(500).json({
      success: false,
      message: 'Kategoriler getirilemedi',
      error: error.message,
    })
  }
}

// Kategori sil
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    await Category.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: 'Kategori silindi' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Kategori silinemedi', error })
  }
}

// Kategori düzenle
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    let image = req.file ? `/uploads/product/${req.file.filename}` : null

    const category = await Category.findByIdAndUpdate(
      id,
      { title, description, ...(image && { image }) },
      { new: true },
    )
    res.status(200).json({ success: true, message: 'Kategori güncellendi', category })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Kategori güncellenemedi', error })
  }
}
