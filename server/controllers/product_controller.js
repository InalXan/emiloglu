import { Product } from '../db/models/product_model.js'
import { Subcategory } from '../db/models/subcategory_model.js'

// Yeni ürün oluştur
export const createProduct = async (req, res) => {
  try {
    const { categoryId, subcategoryId, name, description, price } = req.body
    const image = req.file ? `/uploads/product/${req.file.filename}` : null

    // Alt kategori kontrolü
    const subcategory = await Subcategory.findById(subcategoryId)
    if (!subcategory || subcategory.category.toString() !== categoryId) {
      return res.status(400).json({ message: 'Geçersiz kategori veya alt kategori.' })
    }

    const product = new Product({
      category: categoryId,
      subcategory: subcategoryId,
      name,
      description,
      price,
      image,
    })

    await product.save()

    return res.status(201).json({
      success: true,
      message: 'Ürün başarıyla oluşturuldu!',
      product: await product.populate('category subcategory', 'title _id'),
    })
  } catch (error) {
    console.error('Ürün oluşturulurken hata:', error)
    return res.status(500).json({ message: 'Ürün oluşturulamadı.', error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı' })
    }

    res.status(200).json({ success: true, message: 'Ürün silindi' })
  } catch (error) {
    console.error('Ürün silinemedi:', error)
    res.status(500).json({ success: false, message: 'Ürün silinemedi', error: error.message })
  }
}
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'title _id') // Sadece title ve _id alanını al
      .populate('subcategory', 'title _id') // Sadece title ve _id alanını al
      .lean() // JSON veriye dönüştür (performansı artırır)

    res.status(200).json({ success: true, products })
  } catch (error) {
    console.error('Ürünler getirilemedi:', error)
    res.status(500).json({
      success: false,
      message: 'Ürünler getirilemedi',
      error: error.message,
    })
  }
}

// Ürün düzenle
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, category, subcategory } = req.body

    if (!id || (!name && !price && !category && !subcategory)) {
      return res.status(400).json({ success: false, message: 'Eksik veya hatalı veri' })
    }

    let image = req.file ? `/uploads/product/${req.file.filename}` : null

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, subcategory, ...(image && { image }) },
      { new: true },
    )
    if (!product) {
      return res.status(404).json({ success: false, message: 'Ürün bulunamadı' })
    }

    res.status(200).json({ success: true, message: 'Ürün güncellendi', product })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Ürün güncellenemedi', error })
  }
}
