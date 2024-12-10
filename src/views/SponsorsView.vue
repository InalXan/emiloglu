<script setup>
import navigation_component from '@/components/navigation_component.vue'
import sponsor_one_component from '@/components/sponsor_one_component.vue'
import sponsor_two_component from '@/components/sponsor_two_component.vue'
</script>

<template>
  <navigation_component />
  <wp_component />
  <div class="w-full h-[10vh] relative"></div>
  <div class="w-full min-h-[100vh] bg-gray-100">
    <div
      class="w-full h-[40vh] flex-col text-center bg-[url('https://images.unsplash.com/photo-1683470156383-90f61a736f41?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover flex justify-center items-center relative"
    >
      <h1 class="text-4xl font-bold text-white z-20">Xidmətlərimiz</h1>
      <p class="text-white text-md z-20">ANPRODUCTION MMC 2 sektorda xidmətinizdədir</p>
      <div class="absolute w-full h-full bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
    </div>

    <!-- Images Section -->
    <div id="images" class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-gray-900 mb-6">- Ölkədaxili Tərəfdaşlarımız</h1>
      <sponsor_one_component />
    </div>
    <!-- Images Section -->
    <div id="images" class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold text-gray-900 mb-6">- Ölkəxarici Tərəfdaşlarımız</h1>
      <sponsor_two_component />
    </div>
  </div>
</template>
