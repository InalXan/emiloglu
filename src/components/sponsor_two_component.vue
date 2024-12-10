<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sponsors = ref([])
const loading = ref(true)
const error = ref(null)

const fetchSponsors = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:5000/admin/sponsor/two')
    sponsors.value = response.data
  } catch (err) {
    error.value = 'Sponsorlar yüklenirken bir hata oluştu.'
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const selectedImage = ref(null)

const openModal = (image) => {
  selectedImage.value = image
}

const closeModal = () => {
  selectedImage.value = null
}

onMounted(fetchSponsors)
</script>

<template>
  <!-- Error Message -->
  <div v-if="error" class="text-red-500 text-center my-4">
    {{ error }}
  </div>

  <!-- Loading Spinner -->
  <div v-if="loading" class="flex justify-center items-center">
    <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-500"></div>
  </div>

  <!-- Sponsor Grid -->
  <div
    v-if="!loading && sponsors.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <div
      v-for="(sponsor, index) in sponsors"
      :key="index"
      class="group relative cursor-pointer transform hover:scale-105 transition duration-300"
      @click="openModal(sponsor.image)"
    >
      <div class="aspect-w-3 aspect-h-3">
        <img :src="sponsor.image" alt="Sponsor Image" class="object-cover rounded-lg shadow-lg" />
      </div>
      <div
        class="absolute inset-0 bg-black bg-opacity-25 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <span class="text-white font-semibold">Daha çox bax</span>
      </div>
    </div>
  </div>

  <!-- No Sponsors Message -->
  <div v-if="!loading && sponsors.length === 0" class="text-center text-gray-600">
    Henüz sponsor eklenmemiş.
  </div>

  <!-- Modal -->
  <div
    v-if="selectedImage"
    class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
    @click.self="closeModal"
  >
    <div class="relative">
      <img
        :src="selectedImage"
        class="max-w-full max-h-full rounded-lg shadow-lg"
        alt="Sponsor Image"
      />
      <button
        @click="closeModal"
        class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
      >
        ✕
      </button>
    </div>
  </div>
</template>
