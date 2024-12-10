<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="../../assets/img/about.jpg" alt="" class="w-full h-full object-cover" />
    </div>

    <div
      class="bg-second w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
          Panel hesabınıza daxil olun
        </h1>

        <form class="mt-6" @submit.prevent="handleLogin">
          <div>
            <label class="block text-gray-700">* username</label>
            <input
              type="text"
              name=""
              id=""
              v-model="username"
              placeholder="username"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              required
            />
          </div>

          <div class="mt-4">
            <label class="block text-gray-700">* Şifrə</label>
            <input
              type="password"
              name=""
              id=""
              v-model="password"
              placeholder="***********"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full block bg-primary hover:text-primary hover:bg-second focus:bg-primary text-second font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Giriş Et
          </button>
        </form>

        <hr class="my-6 border-gray-300 w-full" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const error = ref(null)
    const router = useRouter()

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/admin/login', {
          username: username.value,
          password: password.value,
        })

        localStorage.setItem('token', response.data.token)

        router.push('/admin/profile')
      } catch (err) {
        error.value = err.response?.data?.error || 'Login failed. Try again.'
      }
    }

    return {
      username,
      password,
      error,
      handleLogin,
    }
  },
}
</script>
