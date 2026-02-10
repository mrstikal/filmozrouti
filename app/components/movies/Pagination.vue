<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
}>()

defineEmits<{
  (e: 'update:page', value: number): void
}>()

const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < props.totalPages)
</script>

<template>
  <div class="mt-10 flex justify-center gap-2">
    <button :disabled="!canPrev" @click="$emit('update:page', page - 1)">Zpět</button>
    <span class="px-4 py-2 mx-2 bg-gray-700 rounded">Strana {{ page }} / {{ totalPages }}</span>
    <button :disabled="!canNext" @click="$emit('update:page', page + 1)">Další</button>
  </div>
</template>