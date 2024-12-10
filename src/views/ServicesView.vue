<script setup>
import { reactive } from 'vue'
import navigation_component from '@/components/navigation_component.vue'

const services = reactive([
  {
    title: 'Laminat',
    items: [
      'Türkiyə və Rusiya istehsalı olan',
      'geniş çeşiddə laminat',
      'Laminatın quraşdırılması',
      'Laminat seçimi ilə bağlı məsləhət məhsulları',
    ],
    isVisible: false,
  },
  {
    title: 'İnşaat',
    items: [
      'Beton-dəmir-qəlib işləri',
      'Hörgü-suvaq işləri',
      'Şpaplopka işləri',
      'Kafel-metlax işləri',
    ],
    isVisible: false,
  },
  {
    title: 'Mebel',
    items: [
      'Mebellərin xüsusi dizaynı',
      'Mebel satışı',
      'Mebel seçimi ilə bağlı məsləhət',
      'Mebel üçün məkanın planlaşdırılmasında dəstək',
    ],
    isVisible: false,
  },
  { title: 'Rabitə', items: ['Çox yaxında'], isVisible: false },
])

const toggleService = (index) => {
  services[index].isVisible = !services[index].isVisible
}
</script>

<template>
  <div class="w-full min-h-screen">
    <navigation_component />
    <!-- Başlık ve Arka Plan -->
    <div
      class="w-full h-[40vh] flex-col bg-[url('@/assets/img/services-3.jpg')] bg-cover flex justify-center items-center relative"
    >
      <h1 class="text-4xl font-bold text-second z-20">Xidmətlərimiz</h1>
      <p class="text-second text-md z-20">EmilOğlu MMC 4 sektorda xidmətinizdədir</p>
      <div class="absolute w-full h-full bg-[rgba(0,0,0,0.3)] z-10"></div>
    </div>
    <!-- İçerik -->
    <div class="w-full min-h-screen flex justify-evenly flex-wrap items-center">
      <!-- Görsel -->
      <div>
        <img src="@/assets/img/services.png" class="w-[500px]" alt="Services" />
      </div>
      <!-- Hizmet Listesi -->
      <div class="services_all_container flex flex-col gap-6">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="w-[400px] m-4 border border-[rgba(0,0,0,0.3)] bg-second rounded-lg p-5 hover:bg-primary transition duration-500"
          @click="toggleService(index)"
        >
          <div class="text_services">
            <h3 class="text-black flex items-center gap-2 cursor-pointer">
              <ion-icon name="chevron-down-outline"></ion-icon>
              {{ service.title }}
            </h3>
            <ul v-if="service.isVisible && service.items" class="mt-2 ml-6 text-black list-disc">
              <li
                v-for="(item, idx) in service.items"
                :key="`item-${idx}`"
                class="transition duration-300"
              >
                {{ item }}
              </li>
            </ul>
            <p v-else-if="service.isVisible && service.text" class="mt-2">
              {{ service.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
