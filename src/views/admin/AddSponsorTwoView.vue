<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import sidebar_component from '@/components/sidebar_component.vue'

const sponsorName = ref('')
const image = ref(null)

const sponsors = ref([])
const loading = ref(false)
const error = ref('')
const editingSponsor = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  image.value = file || null
}

const submitSponsor = async () => {
  if (!sponsorName.value || !image.value) {
    alert('Bütün Məlumatları daxil edin!')
    return
  }

  const formData = new FormData()
  formData.append('name', sponsorName.value)
  formData.append('image', image.value)

  try {
    const response = await axios.post('http://localhost:5000/admin/sponsor/two', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('Tərəfdaş Əlavə Edildi!')
    sponsors.value.push(response.data)
    resetForm()
  } catch (error) {
    console.error('tərəfdaş ekleme hatası:', error)
    alert('Tərəfdaş Əlavə Edilmədi.')
  }
}

const resetForm = () => {
  sponsorName.value = ''
  image.value = null
}

const fetchSponsors = async () => {
  loading.value = true
  try {
    const response = await axios.get('http://localhost:5000/admin/sponsor/two')
    sponsors.value = response.data
  } catch (err) {
    error.value = 'Tərəfdaşlar Yüklənən Zaman Xəta baş verdi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteSponsor = async (id) => {
  if (confirm('Tərəfdaşı silməyə əminsiz?')) {
    try {
      await axios.delete(`http://localhost:5000/admin/sponsor/two/${id}`)
      sponsors.value = sponsors.value.filter((sponsor) => sponsor._id !== id)
      alert('Tərəfdaş Silindi')
    } catch (err) {
      console.error('mehsul silme hatası:', err)
      alert('Tərəfdaş Silinəndə Xəta Baş Verdi')
    }
  }
}

const startEditSponsor = (sponsor) => {
  editingSponsor.value = { ...sponsor }
}

const updateSponsor = async () => {
  if (!editingSponsor.value) return

  try {
    const formData = new FormData()
    formData.append('name', editingSponsor.value.name)
    if (image.value) formData.append('image', image.value)

    const response = await axios.put(
      `http://localhost:5000/admin/sponsor/two/${editingSponsor.value._id}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )

    const updatedSponsor = response.data
    const index = sponsors.value.findIndex((cat) => cat._id === updatedSponsor._id)
    if (index !== -1) sponsors.value[index] = updatedSponsor

    alert('Tərəfdaş Dəyişdirildi.')
    editingSponsor.value = null
  } catch (err) {
    console.error('Kategori güncelleme hatası:', err)
    alert('Tərəfdaş Dəyişdirilmədi.')
  }
}

onMounted(fetchSponsors)
</script>

<template>
  <div class="w-full flex flex-center">
    <sidebar_component />
    <br /><br /><br /><br /><br /><br />
    <div class="bg-gray-100 my-[60px]">
      <div
        class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2 text-gray-400">
          <span class="text-primary tracking-wider font-thin text-md"
            ><RouterLink to="/admin/prodile">Admin Panel</RouterLink></span
          >
          <span>/</span>
          <span class="tracking-wide text-md">
            <span class="text-base">Tərəfdaşlar</span>
          </span>
          <span>/</span>
        </div>
      </div>
      <div class="header my-3 h-12 px-10 flex items-center justify-between">
        <h1 class="font-medium text-2xl">Tərəfdaş Əlavə Et</h1>
      </div>
      <div class="flex flex-col mx-3 mt-6 lg:flex-row">
        <div class="w-full lg:w-1/3 m-1">
          <form @submit.prevent="submitSponsor" class="w-full bg-second shadow-md p-6">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-full px-3 mb-6">
                <label
                  for="categoryName"
                  class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category_name"
                  >Tərəfdaşın adı</label
                >
                <input
                  v-model="sponsorName"
                  id="sponsorName"
                  class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                  type="text"
                  name="name"
                  placeholder="Tərəfdaşın adı"
                  required
                />
              </div>

              <div class="w-full md:w-full px-3 mb-6">
                <button
                  class="appearance-none block w-full bg-primary text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  Əlavə Et
                </button>
              </div>

              <div class="w-full px-3 mb-8">
                <label
                  class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                  htmlFor="dropzone-file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-green-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Sponsor image
                  </h2>

                  <p class="mt-2 text-gray-500 tracking-wide">
                    Upload or drag & drop your file SVG, PNG, JPG or GIF.
                  </p>

                  <input
                    type="file"
                    @change="handleFileChange"
                    accept="image/*"
                    id="dropzone-file"
                    class="hidden"
                    name="category_image"
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div
          class="w-full lg:w-2/3 m-1 bg-second shadow-lg text-lg rounded-sm border border-gray-200"
        >
          <div class="overflow-x-auto rounded-lg p-3">
            <div v-if="loading">Tərəfdaşlar yüklənir...</div>
            <!-- <div v-if="error" class="text-red-500">{{ error }}</div> -->
            <div v-if="!loading && sponsors.length === 0">Tərəfdaşlar Tapılmadı.</div>
            <table v-if="!loading && sponsors.length > 0" class="table-auto w-full">
              <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                <tr>
                  <th></th>
                  <th>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 h-5 mx-auto">
                      <path
                        d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"
                      ></path>
                    </svg>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold">Şəkil</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Ad</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-center">Kontrol</div>
                  </th>
                </tr>
                <tr v-for="sponsor in sponsors" :key="sponsor._id">
                  <td>1</td>
                  <td><img :src="sponsor.image" class="h-8 w-8 mx-auto" /></td>
                  <td>{{ sponsor.name }}</td>
                  <td>Sample Description</td>
                  <td class="p-2">
                    <div class="flex justify-center">
                      <button
                        @click="startEditSponsor(sponsor)"
                        class="btn-edit rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center"
                      >
                        Dəyişdir
                      </button>
                      <button
                        @click="deleteSponsor(sponsor._id)"
                        class="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center"
                      >
                        <span><FaTrash class="w-4 h-4 mr-1" /></span> Sil
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editingSponsor" class="w-full h-screen flex justify-center items-center modal">
      <div class="modal-content">
        <h3 class="font-bold text-2xl text-primary">Tərəfdaşı Dəyişdir</h3>
        <br />
        <input
          class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
          v-model="editingSponsor.name"
          placeholder="Tərəfdaşın Adı"
        /><br />
        <input class="m-1 p-1" type="file" @change="handleFileChange" /><br />
        <button
          class="btn-edit rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center"
          @click="updateSponsor"
        >
          Dəyişdir
        </button>
        <button
          class="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center"
          @click="editingSponsor = null"
        >
          Ləğv et
        </button>
      </div>
    </div>
  </div>
</template>
