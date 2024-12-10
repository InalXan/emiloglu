<template>
  <div>
    <h1>Ürünler</h1>
    <ul>
      <li v-for="product in products" :key="product._id">
        <img :src="product.image" alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} ₺</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  props: {
    categoryId: String,
  },
  setup(props) {
    const products = ref([])

    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products?category=${props.categoryId}`)
      products.value = data.products
    }

    onMounted(fetchProducts)

    return { products }
  },
}
</script>
