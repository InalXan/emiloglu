<template>
  <div class="w-full flex flex-col min-h-screen">
    <navigation_component />
    <div
      class="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-[url('@/assets/img/home.jpeg')]"
    >
      <div class="w-full flex flex-wrap justify-around items-center my-12 sm:my-3 min-h-[60vh]">
        <!-- Card: İnşaat -->
        <div>
          <img src="@/assets/img/2.jpg" class="w-48 h-48 rounded-md" alt="İnşaat" />
          <h1 class="text-4xl text-center text-second font-bold p-3">İnşaat</h1>
          <div class="flex justify-center">
            <RouterLink
              to="/contact"
              class="px-4 py-2 text-center rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-secondary transition-all"
            >
              Əlaqə
            </RouterLink>
          </div>
        </div>
        <!-- Card: Laminat -->
        <div>
          <img src="@/assets/img/3.jpeg" class="w-48 h-48 rounded-md" alt="Laminat" />
          <h1 class="text-4xl text-center text-second font-bold p-3">Laminat</h1>
          <div class="flex justify-center">
            <RouterLink
              to="/contact"
              class="px-4 py-2 text-center rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-secondary transition-all"
            >
              Əlaqə
            </RouterLink>
          </div>
        </div>
        <!-- Card: Mebel -->
        <div>
          <img src="@/assets/img/1.jpg" class="w-48 h-48 rounded-md" alt="Mebel" />
          <h1 class="text-4xl text-center text-second font-bold p-3">Mebel</h1>
          <div class="flex justify-center">
            <RouterLink
              to="/contact"
              class="px-4 py-2 text-center rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-secondary transition-all"
            >
              Əlaqə
            </RouterLink>
          </div>
        </div>
      </div>
      <!-- Sponsor Bar -->
    </div>
  </div>
</template>

<script setup>
import navigation_component from '@/components/navigation_component.vue'
</script>

<style>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1750px);
  }
}
.animate-scroll {
  animation: scroll 40s linear infinite;
}
</style>
