<script setup>
import navigation_component from '@/components/navigation_component.vue'
</script>

<template>
  <div class="min-h-screen w-full">
    <!-- navigation menu  -->
    <navigation_component />
    <!-- // start header -->
    <div
      class="relative w-full h-[45vh] flex justify-center items-center bg-[url('@/assets/img/about.jpg')] bg-cover bg-center"
    >
      <div class="absolute z-20 w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
      <div class="text-center text-second z-50">
        <h1 class="font-bold text-5xl z-10 m-5">Haqqımızda</h1>
        <p>Gələcəyinizi bizimlə qurun</p>
      </div>
    </div>
    <!-- // end header  -->
    <!-- about text start  -->
    <div
      class="relative w-full bg-[url('@/assets/img/about-back.jfif')] z-[-10] bg-cover min-h-[80vh] flex justify-center items-center"
    >
      <div class="absolute w-full h-full bg-[rgba(255,255,255,0.3)] z-10"></div>
      <div class="w-full m-5 flex justify-evenly flex-wrap items-center">
        <div class="relative h-full flex items-center">
          <div class="img_contain">
            <div
              class="w-[350px] h-[350px] bg-[url('@/assets/img/about-1.jpg')] bg-cover bg-center"
            >
              <div
                class="absolute w-[150px] border-[10px] shadow-md border-primary h-[150px] m-[-35px]"
              ></div>
            </div>
          </div>
        </div>
        <div class="relative h-full flex items-center flex-col">
          <div class="text-left">
            <span style="color: pink; text-decoration: underline">Biz Kimik?</span>
            <h1 style="font-size: 1.8rem">
              "ANPRODUCTİON MMC." <br />
              <span style="color: pink">Müştəri Yönümlü</span> yanaşma ilə <br />
              keyfiyyətli məhsul ve <br />
              <span style="color: pink">inşaat xidmətləri</span> təklif edir.
            </h1>
          </div>
          <div class="w-full flex justify-center items-center">
            <ul class="w-full max-w-[400px]">
              <li class="flex font-italic">
                <ion-icon name="checkmark-circle" class="text-2xl text-primary"></ion-icon>
                <p style="font-size: 0.8rem">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </p>
              </li>
              <li class="flex font-italic">
                <ion-icon name="checkmark-circle" class="text-2xl text-primary"></ion-icon>
                <p style="font-size: 0.8rem">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- about text end -->
    <!-- customer message start  -->
    <div
      class="relative w-full min-h-[50vh] bg-[url('@/assets/img/about-3.jpg')] bg-cover bg-center flex justify-center items-center font-italic text-second z-10 font-bold"
    >
      <div class="absolute z-10 w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
      <h1 class="m-5 text-2xl z-20">
        "Keyfiyyətli məhsullar, <br />
        yenilikçi yanaşmalar və, <br />
        müştəri məmnuniyyətləri ilə <br />
        hər zaman yanınızdayıq"
      </h1>
    </div>
    <!-- customer message end -->
    <div class="w-full min-h-[50vh] bg-primary flex justify-around items-center flex-wrap">
      <div class="service_left">
        <span style="color: #fff; font-style: italic">Dəyərimiz</span>
        <h2 class="text-xl">
          Keyfiyyətli Xidmət, <br />
          Yenilikçi yanaşmalar, <br />
          Müştəri Məmnuniyyəti ilə <br />
          Hər Zaman Yanınızdayiq!
        </h2>
      </div>
      <div class="service_right">
        <div class="flex items-around flex-wrap">
          <div
            class="flex flex-col justify-center items-center text-center w-[300px] p-[15px] m-[10px] rounded-lg bg-second"
          >
            <div>
              <img
                class="w-[50px]"
                src="https://imgs.search.brave.com/SBBPyrIILA01uT5VDKnk0TEJ1YEGE7V0HidCyPTYRUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzI2LzQzLzUw/LzM2MF9GXzgyNjQz/NTAxMV9iOWJQdzQy/SWF3bzFEYnVhbzBF/bDZtNmRKUlJweTFI/bC5qcGc"
              />
            </div>
            <div>
              <h2>Vision</h2>

              <p class="w-full text-[0.8rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              </p>
            </div>
          </div>
          <div
            class="flex flex-col justify-center items-center text-center w-[300px] p-[15px] m-[10px] rounded-lg bg-second"
          >
            <div>
              <img
                class="w-[50px]"
                src="https://imgs.search.brave.com/SBBPyrIILA01uT5VDKnk0TEJ1YEGE7V0HidCyPTYRUU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzI2LzQzLzUw/LzM2MF9GXzgyNjQz/NTAxMV9iOWJQdzQy/SWF3bzFEYnVhbzBF/bDZtNmRKUlJweTFI/bC5qcGc"
              />
            </div>
            <div>
              <h2>Vision</h2>
              <p class="w-full text-[0.8rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- services end  -->
    <!-- fundamentals start  -->
    <div class="w-full flex flex-col sm:flex-row justify-center">
      <div class="hidden mx-10 sm:flex relative justify-center">
        <div class="absolute w-full h-full z-10 bg-[rgba(0,0,0,0.3)]"></div>
        <img src="@/assets/img/about-2.png" class="w-[700px]" alt="" />
      </div>
      <div class="flex items-center flex-col">
        <div class="w-full" id="header">
          <p class="italic m-2 font-bold text-primary text-left">Keçmişdən bu günə</p>
          <h1 class="font-bold m-2 text-2xl">Güclü Təməl, Uğurlu Gələcək...</h1>
          <p class="italic text-md p-4">Uğur Tarixçəsi</p>
        </div>
        <div class="border-b-2 m-3 flex flex-col sm:flex-row">
          <div class="p-5">
            <h1 class="text-4xl font-bold">2020</h1>
          </div>
          <div class="">
            <h1 class="text-xl p-3 font-bold">Mağaza və Biznesin açılması</h1>
            <p class="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
        <div class="border-b-2 m-3 flex flex-col sm:flex-row">
          <div class="p-5">
            <h1 class="text-4xl font-bold">2021</h1>
          </div>
          <div class="">
            <h1 class="text-xl p-3 font-bold">Mağaza və Biznesin açılması</h1>
            <p class="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
        <div class="border-b-2 m-3 flex flex-col sm:flex-row">
          <div class="p-5">
            <h1 class="text-4xl font-bold">2022</h1>
          </div>
          <div class="">
            <h1 class="text-xl p-3 font-bold">Mağaza və Biznesin açılması</h1>
            <p class="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
        <div class="border-b-2 m-3 flex flex-col sm:flex-row">
          <div class="p-5">
            <h1 class="text-4xl font-bold">2023</h1>
          </div>
          <div class="">
            <h1 class="text-xl p-3 font-bold">Mağaza və Biznesin açılması</h1>
            <p class="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
        <div class="border-b-2 m-3 flex flex-col sm:flex-row">
          <div class="p-5">
            <h1 class="text-4xl font-bold">2024</h1>
          </div>
          <div class="">
            <h1 class="text-xl p-3 font-bold">Mağaza və Biznesin açılması</h1>
            <p class="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- fundamentals end  -->
    <!-- best sectors start  -->
    <div class="w-full flex-col md:flex-row flex justify-center items-center">
      <div class="flex flex-col">
        <!-- header  -->
        <div>
          <h1 class="text-4xl font-bold m-2">
            Hər Sektor üzrə Mükəmməllik, Hər Alanda Yenilik: Güclü Addımlarla Gələcəyə Doğru
          </h1>
        </div>
        <div>
          <ul class="m-2">
            <li class="m-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </li>

            <li class="m-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis, pulvinar dapibus leo.
            </li>
            <li>
              <RouterLink to="/services" class="p-2 m-6 rounded-lg bg-primary text-second text-md"
                >Ətraflı</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="relative">
        <div class="absolute w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
        <img src="@/assets/img/about-4.jfif" alt="" />
      </div>
    </div>
    <!-- best sectors end  -->
    <!-- furniture start  -->
    <div
      class="flex flex-col md:flex-row justify-around items-center bg-[url('@/assets/img/about-back-2.png')] bg-cover bg-[#DDE4F1]"
    >
      <div class="flex justify-center items-center">
        <div class="w-[80%]">
          <h1 class="text-4xl">Eviniz üçün mebel və laminata ehtiyacınız var?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </div>
      <div>
        <img src="@/assets/img/about-5.png" alt="" />
      </div>
    </div>
    <!-- furniture end  -->
    <div class="w-full h-[5vh] bg-primary text-second flex items-center justify-end">
      <h1 class="m-3">Copyright © 2024 Furneta, All rights reserved. Powered by InnoTechNova.</h1>
    </div>
  </div>
</template>
