<template>
  <div class="card h-100">
    <div class="position-relative">
      <router-link :to="'/products/' + product.id" class="text-decoration-none">
        <img
          :src="product.image"
          :alt="product.title"
          class="card-img-top p-3"
          style="height: 200px; object-fit: contain;"
        />
      </router-link>
      <button
        class="btn btn-link position-absolute top-0 end-0 p-2 text-danger"
        @click="toggleWishlist"
        :class="{ 'text-danger': isInWishlist, 'text-muted': !isInWishlist }"
      >
        <i class="bi" :class="isInWishlist ? 'bi-heart-fill' : 'bi-heart'"></i>
      </button>
    </div>

    <div class="card-body d-flex flex-column">
      <router-link :to="'/products/' + product.id" class="text-decoration-none">
        <h5 class="card-title text-dark">{{ product.title }}</h5>
        <p class="card-text text-truncate">{{ product.description }}</p>
        <div class="mt-auto">
          <div class="d-flex justify-content-between align-items-center">
            <span class="h5 text-success">${{ product.price }}</span>
            <span class="badge bg-secondary">{{ product.category }}</span>
          </div>
          <div class="mt-2">
            <div class="d-flex align-items-center">
              <div class="rating">
                <i
                  v-for="star in 5"
                  :key="star"
                  class="bi"
                  :class="star <= product.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
                ></i>
              </div>
              <small class="text-muted ms-2">({{ product.rating_count || 0 }})</small>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <div class="card-footer bg-transparent border-top-0">
      <AddToCartButton :product="product" @add-to-cart="handleAddToCart" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import AddToCartButton from '@/components/AddToCartButton.vue'

export default {
  name: 'ProductCard',
  components: {
    AddToCartButton
  },
  props: {
    product: {
      type: Number,
      required: true
    }
  },
  emits: ['add-to-cart'],
  setup(props, { emit }) {
    const wishlistStore = useWishlistStore()

    const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

    const toggleWishlist = () => {
      if (isInWishlist.value) {
        wishlistStore.removeFromWishlist(props.product.id)
      } else {
        wishlistStore.addToWishlist(props.product)
      }
    }

    const handleAddToCart = (product) => {
      emit('add-to-cart', product)
    }

    return {
      isInWishlist,
      toggleWishlist,
      handleAddToCart
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  border: 1px solid #ddd;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1rem;
  height: 2.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-text {
  color: #6c757d;
  font-size: 0.9rem;
}

.rating {
  display: flex;
  gap: 2px;
}

.btn-link {
  text-decoration: none;
  padding: 0.5rem;
  z-index: 1;
}

.btn-link:hover {
  transform: scale(1.1);
}
</style>