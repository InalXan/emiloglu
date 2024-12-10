<script>
import { ref } from 'vue'
import navigation_component from '@/components/navigation_component.vue'
export default {
  components: {
    navigation_component,
  },
  setup() {
    const name = ref('')
    const phone = ref('')
    const message = ref('')
    const successMessage = ref('')

    const submitForm = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.value, phone: phone.value, message: message.value }),
        })
        if (response.ok) {
          successMessage.value = 'Mesaj başarıyla gönderildi!'
          name.value = ''
          phone.value = ''
          message.value = ''
        } else {
          console.error('Mesaj gönderilemedi')
        }
      } catch (error) {
        console.error('Hata oluştu:', error)
      }
    }

    return { name, phone, message, successMessage, submitForm }
  },
}
</script>
<template>
  <navigation_component />
  <section class="text-thirty body-font relative">
    <div class="absolute inset-0 bg-thirty">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="map"
        scrolling="no"
        src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
        style=""
      ></iframe>
    </div>
    <form @submit.prevent="submitForm">
      <div class="container px-5 py-24 mx-auto flex">
        <div
          class="lg:w-1/3 md:w-1/2 bg-second rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
        >
          <h2 class="text-primary text-lg mb-1 font-medium title-font">Əlaqə</h2>
          <p class="leading-relaxed mb-5 text-gray-600">
            Sual və ya Sifarişlərinizi Buradan Göndərə Bilərsiniz.
          </p>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="text"
              id="name"
              v-model="name"
              name="name"
              placeholder="Ad Soyad"
              class="w-full bg-thirty rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-thirty text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="number"
              v-model="phone"
              id="number"
              inputmode="numeric"
              name="number"
              placeholder="+994"
              class="w-full bg-thirty rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-thirty text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
            <textarea
              id="message"
              v-model="message"
              placeholder="Mesaj"
              name="message"
              class="w-full bg-thirty rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-thirty h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            class="text-second bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-thirty rounded text-lg"
          >
            Göndər
          </button>
          <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
          <p class="text-xs text-gray-500 mt-3">
            Sual və ya Sifarişləriniz Tezliklə Cavablandırılacaq.
          </p>
        </div>
      </div>
    </form>
  </section>
</template>
