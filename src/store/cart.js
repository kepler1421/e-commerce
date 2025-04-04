import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(product) {
      this.items.push(product)
    },
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    clearCart() {
      this.items = []
    }
  },
  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + item.price, 0)
    }
  }
}) 