import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),
  actions: {
    addToWishlist(product) {
      if (!this.isInWishlist(product.id)) {
        this.items.push(product)
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    clearWishlist() {
      this.items = []
    }
  },
  getters: {
    isInWishlist: (state) => (productId) => {
      return state.items.some(item => item.id === productId)
    },
    wishlistCount: (state) => {
      return state.items.length
    }
  }
}) 