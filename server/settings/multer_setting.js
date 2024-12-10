import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname'i ESM'de kullanmak için gerekli
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Multer diskStorage yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // URL'ye göre kategori veya ürün dosyalarını ayır
      const type = req.baseUrl.includes('categories') ? 'category' : 'product'
      const uploadPath = path.join(__dirname, `../uploads/${type}`)
      cb(null, uploadPath)
    } catch (error) {
      cb(error, null)
    }
  },
  filename: (req, file, cb) => {
    try {
      // Benzersiz bir dosya adı oluştur
      const uniqueName = `${Date.now()}-${file.originalname}`
      cb(null, uniqueName)
    } catch (error) {
      cb(error, null)
    }
  },
})

// Multer yapılandırması
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum dosya boyutu 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Sadece JPEG, PNG ve GIF formatları destekleniyor!'), false)
    }
  },
})

export default upload
