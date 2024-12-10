<template>
  <nav class="fixed w-full bg-second top-0 flex px-4 border-b md:shadow-lg items-center z-50">
    <div class="text-lg font-bold md:py-0 py-4">
      <RouterLink to="/">
        <img src="../assets/img/logo_home.png" class="w-28" alt="" />
      </RouterLink>
    </div>
    <!-- Hamburger Menu Toggle -->
    <div class="ml-auto md:hidden text-primary cursor-pointer" @click="toggleMenu">
      <ion-icon name="grid-outline" class="text-2xl"></ion-icon>
    </div>
    <!-- Navigation Menu -->
    <ul
      :class="[
        'md:px-2',
        'ml-auto',
        'md:flex',
        'md:space-x-2',
        'absolute',
        'md:relative',
        'top-full',
        'left-0',
        'right-0',
        mobileMenuOpen ? 'block' : 'hidden',
        'md:block',
        'bg-second',
      ]"
    >
      <li>
        <RouterLink to="/" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Ana Səhifə</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/services" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Xidmətlərimiz</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/products" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Məhsullar</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/sponsors" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Tərəfdaşlarımız</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/about" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Haqqımızda</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/contact" class="flex md:inline-flex p-4 items-center hover:bg-thirty">
          <span>Əlaqə</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      dropdownOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
  },
}
</script>

<style scoped>
@media only screen and (min-width: 768px) {
  .parent:hover .child {
    opacity: 1;
    height: auto;
    overflow: visible;
    transform: translateY(0);
  }
  .child {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transform: translateY(-10%);
  }
}
</style>
