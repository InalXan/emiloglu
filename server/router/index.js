import { Router } from 'express'
// import { uploadCategoryImage } from '../settings/multer_category_setting.js'
import { uploadSponsorImage } from '../settings/multer_sponsor_setting.js'
// import { uploadProductImage } from '../settings/multer_product_setting.js'
import upload from '../settings/multer_setting.js'

// auth controllers
import register from '../controllers/register_controller.js'
import login from '../controllers/login_controller.js'
import profile from '../controllers/profile_controller.js'
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../controllers/category_controller.js'
import {
  createSubcategory,
  getSubcategories,
  deleteSubcategory,
  updateSubcategory,
} from '../controllers/subcategory_controller.js'
import {
  addSponsor,
  getSponsor,
  deleteSponsor,
  updateSponsor,
} from '../controllers/sponsor_one_controller.js'
import {
  addSponsortwo,
  getSponsortwo,
  deleteSponsortwo,
  updateSponsortwo,
} from '../controllers/sponsor_two_controller.js'
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../controllers/product_controller.js'
import { sendMessage, getMessages, deleteMessage } from '../controllers/contact_controller.js'
// middlewares
import verifyToken from '../middlewares/auth_middleware.js'
const router = Router()

// users
router.post('/admin/register', register)
router.post('/admin/login', login)
router.get('/admin/profile', verifyToken, profile)
// category
router.post('/admin/categories', upload.single('image'), createCategory)
router.get('/admin/categories', getCategories)
router.delete('/admin/categories/:id', deleteCategory)
// router.put('/admin/categories/:id', uploadCategoryImage.single('image'), updateCategory)

// category
router.post('/admin/subcategories', createSubcategory)
router.get('/admin/subcategories', getSubcategories)
router.delete('/admin/subcategories/:id', deleteSubcategory)
router.put('/admin/subcategories/:id', updateSubcategory)

// product
router.post('/admin/products', upload.single('image'), createProduct)
router.get('/admin/products', getProducts)
router.delete('/admin/products/:id', deleteProduct)
router.put('/admin/products/:id', upload.single('image'), updateProduct)

// sponsors one
router.post('/admin/sponsor/one', uploadSponsorImage.single('image'), addSponsor)
router.get('/admin/sponsor/one', getSponsor)
router.delete('/admin/sponsor/one/:id', deleteSponsor)
router.put('/admin/sponsor/one/:id', uploadSponsorImage.single('image'), updateSponsor)

// sponsors two
router.post('/admin/sponsor/two', uploadSponsorImage.single('image'), addSponsortwo)
router.get('/admin/sponsor/two', getSponsortwo)
router.delete('/admin/sponsor/two/:id', deleteSponsortwo)
router.put('/admin/sponsor/two/:id', uploadSponsorImage.single('image'), updateSponsortwo)

// contact
router.post('/admin/contact', sendMessage)
router.get('/admin/contact', getMessages)
router.delete('/admin/contact/:id', deleteMessage)

export default router
