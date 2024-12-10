<template>
  <sidebar_component />
  <div class="w-full min-h-screen flex justify-center py-12 bg-gray-50">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col m-4 p-6 bg-white shadow-md rounded-lg w-1/3"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Alt Kategoriya Əlavə Et</h2>

      <label for="category" class="text-gray-600 mb-2">Kategoriyalar:</label>
      <select
        v-model="subcategory.category"
        required
        class="border rounded-md p-2 mb-4 focus:ring focus:ring-blue-200"
      >
        <option v-for="category in categories" :key="category._id" :value="category._id">
          {{ category.title }}
        </option>
      </select>

      <label for="title" class="text-gray-600 mb-2">Başlıq:</label>
      <input
        v-model="subcategory.title"
        type="text"
        placeholder="Alt kategoriya başlığı"
        required
        class="border rounded-md p-2 mb-4 focus:ring focus:ring-blue-200"
      />

      <label for="description" class="text-gray-600 mb-2">Xülasə:</label>
      <textarea
        v-model="subcategory.description"
        placeholder="Alt kategoriya xülasəsi"
        class="border rounded-md p-2 mb-4 focus:ring focus:ring-blue-200"
      ></textarea>

      <button type="submit" class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
        Alt Kategoriya Əlavə Et
      </button>

      <p v-if="errorMessage" class="error-message mt-2">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message mt-2">{{ successMessage }}</p>
    </form>
  </div>

  <div class="w-full flex flex-col items-center py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-700">Alt Kategoriyalar</h2>
    <ul class="category-list w-2/3 bg-white shadow-md rounded-lg p-6">
      <li
        v-for="item in subcategories"
        :key="item._id"
        class="category-item flex justify-between items-center py-2 border-b last:border-b-0"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="editSubcategory(item)"
            class="text-sm bg-yellow-400 text-white rounded-md py-1 px-3 hover:bg-yellow-500"
          >
            Dəyişdir
          </button>
          <button
            @click="deleteSubcategory(item._id)"
            class="text-sm bg-red-500 text-white rounded-md py-1 px-3 hover:bg-red-600"
          >
            Sil
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import sidebar_component from '@/components/sidebar_component.vue'

export default {
  components: {
    sidebar_component,
  },
  setup() {
    const categories = ref([])
    const subcategory = ref({
      category: '',
      title: '',
      description: '',
    })
    const subcategories = ref([])
    const errorMessage = ref('')
    const successMessage = ref('')
    const isEditing = ref(false)
    const editingId = ref(null)

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/categories')
        categories.value = data.categories
      } catch (error) {
        errorMessage.value = 'Kadegoriyalar Əlavə edildiyi zaman xəta baş verdi.'
        console.error('Alt kategoriyalar yüklənmədi:', error)
      }
    }

    const fetchSubcategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/subcategories')
        subcategories.value = data.subcategories
      } catch (error) {
        console.error('Alt kategoriyalar yüklənmədi:', error)
      }
    }

    const handleSubmit = async () => {
      errorMessage.value = ''
      successMessage.value = ''

      if (!subcategory.value.category || !subcategory.value.title) {
        errorMessage.value = 'Bütün Məlimatları Doldurun.'
        return
      }

      try {
        if (isEditing.value) {
          await axios.put(
            `http://localhost:5000/admin/subcategories/${editingId.value}`,
            subcategory.value,
          )
          successMessage.value = 'Alt Kategoriyalar Uğurla Əlavə Edildi!'
        } else {
          await axios.post('http://localhost:5000/admin/subcategories', subcategory.value)
          successMessage.value = 'Alt Kategoriyalar Uğurla Əlavə Edildi!'
        }

        // Formu temizle ve alt kategorileri yeniden yükle
        subcategory.value = { category: '', title: '', description: '' }
        isEditing.value = false
        editingId.value = null
        fetchSubcategories()
      } catch (error) {
        if (error.response && error.response.data.message) {
          errorMessage.value = error.response.data.message
        } else {
          errorMessage.value = 'Bir Xəta Yarandı'
        }
        console.error('Alt Kategoriya Əlavə Edilən Zaman Xəta Yarandı:', error)
      }
    }

    const deleteSubcategory = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/admin/subcategories/${id}`)
        successMessage.value = 'Alt kategori başarıyla silindi!'
        fetchSubcategories()
      } catch (error) {
        errorMessage.value = 'Alt kategoriya Silinə bilmədi.'
        console.error('Silinmədi:', error)
      }
    }

    const editSubcategory = (item) => {
      subcategory.value = { ...item }
      isEditing.value = true
      editingId.value = item._id
    }

    onMounted(() => {
      fetchCategories()
      fetchSubcategories()
    })

    return {
      categories,
      subcategory,
      subcategories,
      handleSubmit,
      deleteSubcategory,
      editSubcategory,
      errorMessage,
      successMessage,
    }
  },
}
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-top: 10px;
}
</style>
