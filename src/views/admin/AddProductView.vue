<template>
  <sidebar_component />
  <br />
  <div class="product-management bg-gray-50 min-h-screen py-12">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-8">Ürün Yönetimi</h1>

      <form
        @submit.prevent="handleSubmit"
        class="product-form bg-white p-6 shadow-md rounded-lg max-w-2xl mx-auto"
      >
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Yeni Ürün Ekle</h2>

        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-600 mb-2"
            >Kategori Seç:</label
          >
          <select
            v-model="product.categoryId"
            @change="filterSubcategories"
            required
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>Bir kategori seçin</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.title }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="subcategory" class="block text-sm font-medium text-gray-600 mb-2"
            >Alt Kategoriyanı seç:</label
          >
          <select
            v-model="product.subcategoryId"
            :disabled="!filteredSubcategories.length"
            required
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>Bir alt kategoriya seçin</option>
            <option v-for="subcat in filteredSubcategories" :key="subcat._id" :value="subcat._id">
              {{ subcat.title }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-600 mb-2"
            >Məhsulun Adı:</label
          >
          <input
            v-model="product.name"
            type="text"
            placeholder="Məhsulun Adı"
            required
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-600 mb-2"
            >Xülasə:</label
          >
          <textarea
            v-model="product.description"
            placeholder="Məhsulun Açıklaması"
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-600 mb-2"
            >Qiymət (AZN):</label
          >
          <input
            v-model.number="product.price"
            type="number"
            placeholder="Qiymət"
            required
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-600 mb-2"
            >Ürün Görseli:</label
          >
          <input
            type="file"
            @change="handleFileUpload"
            required
            class="block w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all"
        >
          Məhsulun Ekle
        </button>

        <p v-if="errorMessage" class="mt-4 text-red-600 font-medium">{{ errorMessage }}</p>
        <p v-if="successMessage" class="mt-4 text-green-600 font-medium">{{ successMessage }}</p>
      </form>

      <ul class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <li
          v-for="prod in products"
          :key="prod._id"
          class="product-item bg-white p-4 rounded-lg shadow-md"
        >
          <img
            :src="`http://localhost:5000${prod.image}`"
            :alt="prod.name"
            class="w-full h-48 object-cover rounded-md"
          />
          <h3 class="text-lg font-semibold text-gray-800 mt-4">{{ prod.name }}</h3>
          <p class="text-sm text-gray-600">{{ getSubcategoryName(prod.subcategoryId) }}</p>
          <p class="text-sm text-gray-600">{{ prod.description }}</p>
          <p class="text-lg font-bold text-blue-500 mt-2">{{ prod.price }} AZN</p>
          <button
            @click="deleteProduct(prod._id)"
            class="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
          >
            Sil
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.product-management {
  font-family: 'Inter', sans-serif;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}
</style>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import sidebar_component from '@/components/sidebar_component.vue'

export default {
  components: {
    sidebar_component,
  },
  setup() {
    const product = ref({
      categoryId: '',
      subcategoryId: '',
      name: '',
      description: '',
      price: null,
      image: null,
    })

    const categories = ref([])
    const subcategories = ref([])
    const filteredSubcategories = ref([])
    const products = ref([])
    const errorMessage = ref('')
    const successMessage = ref('')

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/categories')
        categories.value = data.categories
      } catch (error) {
        console.error('Kategoriler yüklenirken hata oluştu:', error)
      }
    }

    const fetchSubcategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/subcategories')
        subcategories.value = data.subcategories
      } catch (error) {
        console.error('Alt kategoriler yüklenirken hata oluştu:', error)
      }
    }

    const filterSubcategories = () => {
      filteredSubcategories.value = subcategories.value.filter(
        (subcat) => subcat.category && subcat.category._id === product.value.categoryId,
      )
    }

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/products')
        products.value = data.products
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error)
      }
    }

    const handleFileUpload = (event) => {
      product.value.image = event.target.files[0]
    }

    const handleSubmit = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      if (!product.value.categoryId || !product.value.subcategoryId) {
        errorMessage.value = 'Kategori ve alt kategori seçimi zorunludur.'
        return
      }

      try {
        const formData = new FormData()
        formData.append('categoryId', product.value.categoryId)
        formData.append('subcategoryId', product.value.subcategoryId)
        formData.append('name', product.value.name)
        formData.append('description', product.value.description)
        formData.append('price', product.value.price)
        formData.append('image', product.value.image)

        await axios.post('http://localhost:5000/admin/products', formData)
        successMessage.value = 'Ürün başarıyla eklendi!'
        fetchProducts()

        product.value = {
          categoryId: '',
          subcategoryId: '',
          name: '',
          description: '',
          price: null,
          image: null,
        }
      } catch (error) {
        console.error('Ürün eklenirken hata oluştu:', error)
        errorMessage.value = 'Ürün eklenirken bir hata oluştu. Lütfen tekrar deneyin.'
      }
    }

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/admin/products/${id}`)
        successMessage.value = 'Ürün başarıyla silindi!'
        fetchProducts()
      } catch (error) {
        console.error('Ürün silinirken hata oluştu:', error)
        errorMessage.value = 'Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.'
      }
    }

    const getSubcategoryName = (id) => {
      const subcategory = subcategories.value.find((subcat) => subcat._id === id)
      return subcategory ? subcategory.title : 'Bilinmiyor'
    }

    onMounted(() => {
      fetchCategories()
      fetchSubcategories()
      fetchProducts()
    })

    return {
      product,
      categories,
      subcategories,
      filteredSubcategories,
      products,
      handleFileUpload,
      handleSubmit,
      deleteProduct,
      getSubcategoryName,
      filterSubcategories,
      errorMessage,
      successMessage,
    }
  },
}
</script>
