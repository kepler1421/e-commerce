<template>
  <div class="input-group" style="width: 150px;">
    <button 
      class="btn btn-outline-secondary" 
      type="button" 
      @click="decrement"
      :disabled="modelValue <= min"
    >
      -
    </button>
    <input 
      type="number" 
      class="form-control text-center" 
      v-model="localValue"
      :min="min"
      :max="max"
      @input="updateValue"
    >
    <button 
      class="btn btn-outline-secondary" 
      type="button" 
      @click="increment"
      :disabled="modelValue >= max"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 99
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})

const increment = () => {
  if (localValue.value < props.max) {
    localValue.value++
    emit('update:modelValue', localValue.value)
  }
}

const decrement = () => {
  if (localValue.value > props.min) {
    localValue.value--
    emit('update:modelValue', localValue.value)
  }
}

const updateValue = () => {
  let value = parseInt(localValue.value)
  if (isNaN(value)) value = props.min
  value = Math.max(props.min, Math.min(props.max, value))
  localValue.value = value
  emit('update:modelValue', value)
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style> 