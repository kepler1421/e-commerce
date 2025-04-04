<template>
  <div class="alert alert-danger" role="alert">
    <div class="d-flex align-items-center">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <div>
        <h5 class="alert-heading mb-1">Error</h5>
        <p class="mb-0">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script> 