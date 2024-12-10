<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import sidebar_component from '@/components/sidebar_component.vue'

const username = ref('')
const userId = ref('')

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/admin/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    username.value = response.data.data.username
    userId.value = response.data.data.user_id
  } catch (error) {
    console.error('Error fetching user data:', error.response?.data || error.message)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="w-full min-h-screen">
    <sidebar_component />
    <div
      class="bg-[url('@/assets/img/about-3.jpg')] relative bg-cover bg-center w-full h-[40vh] flex justify-center items-center"
    >
      <!-- Arka plan -->
    </div>
    <div class="w-full h-[5vh] text-2xl font-bold text-center text-second bg-primary">
      <h1>Anproduction Panelinə Xoş Gəlmisiniz !!!</h1>
    </div>
    <!-- Profil -->
    <div class="w-full flex justify-center items-center">
      <div
        class="w-[300px] h-[250px] flex justify-center flex-col p-2 border shadow-md m-2 items-center"
      >
        <div
          class="w-36 h-36 rounded-full bg-center bg-cover"
          style="
            background-image: url('https://imgs.search.brave.com/XFTZ6OPY1Wvi0irX0oGscPsWsXHusUhwA0BiiyXZvPw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzc1LzUwLzMx/LzM2MF9GXzEwNzU1/MDMxNTZfZFU1WG1q/aHQ5TWk0aXlxemhs/TG1LVlJoNVp2aG9y/UUkuanBn');
          "
        ></div>
        <div class="text-primary">
          <h1>Istifadəçi Adı: {{ username }}</h1>
        </div>
        <div class="text-primary">
          <h1>User ID: {{ userId }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
