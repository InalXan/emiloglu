<template>
  <sidebar_component />
  <br />
  <div class="admin-panel bg-gray-50 min-h-screen flex">
    <div class="flex-1 container mx-auto p-12">
      <h1 class="text-3xl font-bold text-gray-700 mb-6">Mesaj Qutusu</h1>

      <div class="messages">
        <ul v-if="contacts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li
            v-for="contact in contacts"
            :key="contact._id"
            class="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <p class="text-gray-800">
              <strong class="text-blue-500">Ad Soyad:</strong> {{ contact.name }}
            </p>
            <p class="text-gray-800">
              <strong class="text-blue-500">Telefon:</strong> {{ contact.phone }}
            </p>
            <p class="text-gray-800">
              <strong class="text-blue-500">Mesaj:</strong> {{ contact.message }}
            </p>
            <button
              @click="deleteContact(contact._id)"
              class="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Sil
            </button>
          </li>
        </ul>
        <p v-else class="text-center text-gray-600 text-lg">Henüz mesaj bulunmuyor.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import sidebar_component from '@/components/sidebar_component.vue'

export default {
  components: {
    sidebar_component,
  },
  setup() {
    const contacts = ref([])

    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/contact')
        if (response.ok) {
          contacts.value = await response.json()
        } else {
          console.error('Mesajlar görüntülenemiyor')
        }
      } catch (error) {
        console.error('Hata oluştu:', error)
      }
    }

    const deleteContact = async (id) => {
      if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return

      try {
        const response = await fetch(`http://localhost:5000/admin/contact/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          contacts.value = contacts.value.filter((contact) => contact._id !== id)
        } else {
          console.error('Mesaj silinemedi')
        }
      } catch (error) {
        console.error('Silme işlemi sırasında hata oluştu:', error)
        alert('Mesaj silinemedi.')
      }
    }

    onMounted(fetchContacts)

    return { contacts, deleteContact }
  },
}
</script>

<style scoped>
.admin-panel {
  font-family: 'Inter', sans-serif;
}

.messages ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

button {
  transition: background-color 0.3s ease;
}
</style>
