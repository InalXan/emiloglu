import { Subcategory } from '../db/models/subcategory_model.js'
// import { Category } from '../db/models/category_model.js'

export const createSubcategory = async (req, res) => {
  try {
    console.log('Gelen veri:', req.body)

    const { category, title, description } = req.body

    if (!category || !title) {
      return res.status(400).json({ message: 'Kategori ve başlık alanları gereklidir.' })
    }

    const name = title.toLowerCase().replace(/\s+/g, '-')

    // Benzersizliği kontrol et
    const existingSubcategory = await Subcategory.findOne({ name })
    if (existingSubcategory) {
      return res.status(400).json({
        message: 'Bu isim zaten mevcut. Farklı bir başlık deneyin.',
        error: 'Duplicate key error',
      })
    }

    const newSubcategory = new Subcategory({
      category,
      title,
      description,
      name,
    })

    await newSubcategory.save()
    return res.status(201).json({
      message: 'Alt kategori başarıyla oluşturuldu!',
      subcategory: newSubcategory,
    })
  } catch (error) {
    console.error('Alt kategori oluşturulurken hata:', error)

    return res.status(500).json({ message: 'Bir hata oluştu.', error: error.message })
  }
}
// Alt kategorileri getir
export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category')
    res.status(200).json({ subcategories })
  } catch (error) {
    console.error('Alt kategoriler alınırken hata oluştu:', error)
    res.status(500).json({ message: 'Alt kategoriler alınırken bir hata oluştu.' })
  }
}
// Alt kategori sil
export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params

    const deletedSubcategory = await Subcategory.findByIdAndDelete(id)
    if (!deletedSubcategory) {
      return res.status(404).json({ success: false, message: 'Alt kategori bulunamadı' })
    }

    res.status(200).json({ success: true, message: 'Alt kategori silindi' })
  } catch (error) {
    console.error('Alt kategori silinemedi:', error)
    res
      .status(500)
      .json({ success: false, message: 'Alt kategori silinemedi', error: error.message })
  }
}

// Alt kategori düzenle
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params
    const { title, category, description } = req.body

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { title, category, description },
      { new: true, runValidators: true }, // Yeni veriyi döndür ve validasyonları uygula
    )

    if (!updatedSubcategory) {
      return res.status(404).json({ success: false, message: 'Alt kategori bulunamadı' })
    }

    res
      .status(200)
      .json({ success: true, message: 'Alt kategori güncellendi', subcategory: updatedSubcategory })
  } catch (error) {
    console.error('Alt kategori güncellenemedi:', error)
    res
      .status(500)
      .json({ success: false, message: 'Alt kategori güncellenemedi', error: error.message })
  }
}
