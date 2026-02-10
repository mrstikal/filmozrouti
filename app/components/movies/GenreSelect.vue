<script setup lang="ts">
defineProps<{
  modelValue: string | null
  genres: Array<{ id: string; name: string }>
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <label for="genre-select" class="font-bold text-sm leading-none text-gray-500">Žánr:</label>
    <USelect
      id="genre-select"
      class="bg-gray-700 px-3.5 py-2 flex"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :items="[
        { label: 'Všechny žánry', value: null },
        ...genres.map((g) => ({ label: g.name, value: g.id }))
      ]"
      :ui="{
        base: 'flex items-center',
        content: 'bg-gray-800 py-1 max-h-[var(--reka-popper-available-height)] overflow-hidden',
        viewport: 'scroll-py-1 overflow-y-auto flex-1 scrollbar-thin-dark',
        item: 'px-4 py-1 flex justify-between items-center cursor-pointer data-[highlighted]:bg-gray-900',
        trailing: 'relative flex items-center pl-4',
        itemTrailingIcon: 'relative top-[0.15rem] ml-2'
      }"
    />
  </div>
</template>