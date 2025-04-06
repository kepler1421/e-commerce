
<template>
    <button class="btn btn-primary w-100" @click="handleClick">
      Add to Cart
    </button>
  </template>
  
  <script>
  export default {
    name: 'AddToCartButton',
    props: {
      product: {
        type: Number,
        required: true
      }
    },
    emits: ['add-to-cart'],
    methods: {
      handleClick() {
        this.$emit('add-to-cart', this.product)
      }
    }
  }
  </script>
  