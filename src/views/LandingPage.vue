<template>
  <div>
    <Navbar />

    <HeroCarousel />

    <section class="container my-5">
      <h2 class="mb-4 text-center fw-bold">Featured Products</h2>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Loading products...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center my-5">
        <p class="text-muted">No products found.</p>
      </div>

      <div v-else class="row g-4">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="product in filteredProducts.slice(0, 8)"
          :key="product.id"
        >
          <ProductCard :product="product" @add-to-cart="handleAddToCart" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import HeroCarousel from '@/components/HeroCarousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import Footer from '@/components/Footer.vue'
import { getAllProducts } from '@/services/api'

export default {
  name: 'LandingPage',
  components: {
    Navbar,
    HeroCarousel,
    ProductCard,
    Footer
  },
  data() {
    return {
      products: [],
      loading: true
    }
  },
  computed: {
    filteredProducts() {
      const query = (this.$route.query.search || '').toLowerCase()
      if (!query) return this.products
      return this.products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await getAllProducts()
        console.log(res)
        this.products = res
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        this.loading = false
      }
    },
    handleAddToCart(product) {
      console.log('Added to cart:', product.title)
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>