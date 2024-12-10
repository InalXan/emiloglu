<template>
  <sidebar_component />
  <br />
  <br />
  <div class="category-management w-full min-h-screen flex flex-col items-center py-12 bg-gray-50">
    <h1 class="text-3xl font-bold mb-8 text-gray-700">Kategori Yönetimi</h1>

    <form
      @submit.prevent="handleSubmit"
      class="category-form bg-white p-8 shadow-md rounded-lg w-2/3"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Yeni Kategori Ekle</h2>

      <input
        v-model="category.title"
        placeholder="Kategori Başlığı"
        required
        class="border rounded-md p-3 mb-4 w-full focus:ring focus:ring-blue-200"
      />
      <textarea
        v-model="category.description"
        placeholder="Kategori Açıklaması"
        class="border rounded-md p-3 mb-4 w-full focus:ring focus:ring-blue-200"
      ></textarea>
      <input
        type="file"
        @change="handleFileUpload"
        class="border p-2 mb-4 w-full focus:ring focus:ring-blue-200"
      />

      <button
        :disabled="isSubmitting"
        type="submit"
        class="bg-blue-500 text-white rounded-md py-2 px-6 hover:bg-blue-600 transition-all"
      >
        {{ isSubmitting ? 'Ekleniyor...' : 'Kategori Ekle' }}
      </button>
    </form>

    <ul class="category-list w-2/3 bg-white shadow-md rounded-lg mt-8 p-6">
      <h2 class="text-xl font-semibold mb-6 text-gray-700">Mevcut Kategoriler</h2>
      <li
        v-for="cat in categories"
        :key="cat._id"
        class="category-item flex items-center justify-between p-4 border-b last:border-b-0"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="cat.image"
            :src="`http://localhost:5000${cat.image}`"
            :alt="cat.title"
            class="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ cat.title }}</h3>
            <p class="text-gray-600">{{ cat.description }}</p>
          </div>
        </div>
        <button
          @click="deleteCategory(cat._id)"
          class="bg-red-500 text-white rounded-md py-1 px-3 hover:bg-red-600 transition-all"
        >
          Sil
        </button>
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
    const category = ref({ title: '', description: '', image: null })
    const categories = ref([])
    const isSubmitting = ref(false)

    const handleFileUpload = (event) => {
      category.value.image = event.target.files[0]
    }

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/categories')
        categories.value = data.categories
      } catch (error) {
        console.error('Kategoriler alınırken hata oluştu:', error.message)
        alert('Kategoriler yüklenirken bir hata oluştu.')
      }
    }

    const handleSubmit = async () => {
      if (!category.value.title.trim()) {
        alert('Başlık alanı boş olamaz.')
        return
      }

      isSubmitting.value = true
      try {
        const formData = new FormData()
        formData.append('title', category.value.title)
        formData.append('description', category.value.description)
        if (category.value.image) formData.append('image', category.value.image)

        await axios.post('http://localhost:5000/admin/categories', formData)
        alert('Kategori başarıyla eklendi!')
        fetchCategories()
        category.value = { title: '', description: '', image: null }
      } catch (error) {
        console.error('Kategori eklenirken hata oluştu:', error.message)
        alert('Kategori eklenirken bir hata oluştu. Lütfen tekrar deneyin.')
      } finally {
        isSubmitting.value = false
      }
    }

    const deleteCategory = async (id) => {
      if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return

      try {
        await axios.delete(`http://localhost:5000/admin/categories/${id}`)
        alert('Kategori başarıyla silindi!')
        fetchCategories()
      } catch (error) {
        console.error('Kategori silinirken hata oluştu:', error.message)
        alert('Kategori silinirken bir hata oluştu. Lütfen tekrar deneyin.')
      }
    }

    onMounted(fetchCategories)

    return {
      category,
      categories,
      isSubmitting,
      handleFileUpload,
      handleSubmit,
      deleteCategory,
    }
  },
}
</script>

<style scoped>
.category-management {
  font-family: 'Inter', sans-serif;
}

.category-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.category-item:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

button {
  transition: all 0.3s;
}

button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}
</style>
