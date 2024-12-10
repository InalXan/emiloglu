<template>
  <navigation_component />
  <div class="py-12 my-11">
    <!-- Header -->
    <div
      class="relative w-full h-[45vh] flex justify-center items-center bg-[url('@/assets/img/about.jpg')] bg-cover bg-center"
    >
      <div class="absolute z-20 w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
      <div class="text-center text-second z-50">
        <h1 class="font-bold text-5xl z-10 m-5">Məhsullar</h1>
        <p>Ən keyfiyyətli Məhsullara Sizin Olsun</p>
      </div>
    </div>

    <!-- Kategoriler Bölümü -->
    <div class="w-full flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold my-2">- Kategoriyalar -</h2>
      <div class="w-1/2 bg-slate-300 h-[0.1rem]"></div>
      <ul class="flex">
        <li class="p-2 m-1 border cursor-pointer" @click="showAllProducts">Bütün Məhsullar</li>
        <li
          class="p-2 m-1 border cursor-pointer"
          v-for="category in categories"
          :key="category._id"
          @click="selectCategory(category._id)"
        >
          {{ category.title }}
        </li>
      </ul>
    </div>

    <!-- Alt Kategoriler Bölümü -->
    <div v-if="selectedCategory" class="subcategory-list">
      <h2 class="text-2xl font-bold">- Alt Kategoriyalar -</h2>
      <ul class="w-full flex justify-center items-center">
        <li
          class="p-2 m-1 border cursor-pointer"
          v-for="subcat in filteredSubcategories"
          :key="subcat._id"
          @click="selectSubcategory(subcat._id)"
        >
          {{ subcat.title }}
        </li>
      </ul>
    </div>

    <!-- Ürünler Bölümü -->
    <div class="product-list">
      <h2 class="text-2xl font-bold">- Məhsullar -</h2>
      <ul class="w-full flex justify-center flex-wrap">
        <li
          v-for="product in filteredProducts"
          :key="product._id"
          class="w-[300px] m-3 p-3 shadow-lg border rounded-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="openModal(product.image)"
        >
          <!-- Resim -->
          <div class="image-container relative">
            <img
              :src="`http://localhost:5000${product.image}`"
              :alt="product.name"
              class="w-full h-[200px] object-cover rounded-md"
            />
          </div>
          <!-- Ürün Bilgileri -->
          <h3 class="mt-3 font-semibold text-lg">{{ product.name }}</h3>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-green-600 font-bold">{{ product.price }} ₺</p>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      >
        <div class="relative">
          <img
            :src="selectedImage"
            class="max-w-[90vw] max-h-[90vh] object-contain rounded-md"
            alt="Selected Product"
          />
          <button
            class="absolute top-0 right-0 text-white bg-red-500 p-2 rounded-full cursor-pointer shadow-md"
            @click="closeModal"
          >
            ×
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
/* Fade Geçiş Efekti */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Modal İçin Stil */
.fixed {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font-size: 1.5rem;
  line-height: 1;
}
</style>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import navigation_component from '@/components/navigation_component.vue'

export default {
  components: {
    navigation_component,
  },
  setup() {
    const categories = ref([])
    const subcategories = ref([])
    const products = ref([])
    const selectedCategory = ref(null)
    const selectedSubcategory = ref(null)
    const filteredSubcategories = ref([])
    const filteredProducts = ref([])
    const selectedImage = ref(null) // Seçilen resim için state

    const openModal = (image) => {
      selectedImage.value = `http://localhost:5000${image}`
    }

    const closeModal = () => {
      selectedImage.value = null
    }

    // Fetch data from API
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

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/products')
        products.value = data.products
        filteredProducts.value = data.products
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error)
      }
    }

    // Filtering functions
    const showAllProducts = () => {
      selectedCategory.value = null
      selectedSubcategory.value = null
      filteredSubcategories.value = []
      filteredProducts.value = products.value
    }

    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId
      selectedSubcategory.value = null
      filteredSubcategories.value = subcategories.value.filter(
        (subcat) => subcat.category && subcat.category._id === categoryId,
      )
      filteredProducts.value = products.value.filter(
        (product) => product.category && product.category._id === categoryId,
      )
    }

    const selectSubcategory = (subcategoryId) => {
      selectedSubcategory.value = subcategoryId
      filteredProducts.value = products.value.filter(
        (product) => product.subcategory && product.subcategory._id === subcategoryId,
      )
    }

    onMounted(() => {
      fetchCategories()
      fetchSubcategories()
      fetchProducts()
    })

    return {
      categories,
      subcategories,
      products,
      selectedCategory,
      selectedSubcategory,
      filteredSubcategories,
      filteredProducts,
      selectedImage,
      openModal,
      closeModal,
      showAllProducts,
      selectCategory,
      selectSubcategory,
    }
  },
}
</script>
