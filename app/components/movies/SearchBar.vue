<script setup lang="ts">
defineProps<{
  modelValue: string
  showClear: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()
</script>

<template>
  <form class="relative w-full md:w-96 flex items-center" @submit.prevent>
    <input
        :value="modelValue"
        type="text"
        placeholder="Napiš co hledáš..."
        class="block text-sm w-full max-w-md px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-1 focus:ring-gray-600 outline-none"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
        v-if="showClear"
        type="button"
        class="block absolute right-5 text-gray-100 hover:text-gray-200"
        @click="$emit('clear')"
    >
      ✕
    </button>
  </form>
</template>