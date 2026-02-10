<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const sortOptions = [
  { label: 'Nejoblíbenější', value: 'popularity.desc' },
  { label: 'Nejlépe hodnocené', value: 'vote_average.desc' },
  { label: 'Nejhůře hodnocené', value: 'vote_average.asc' },
  { label: 'Nejnovější', value: 'primary_release_date.desc' },
  { label: 'Nejstarší', value: 'primary_release_date.asc' },
]
</script>

<template>
  <div class="flex gap-2 items-center">
    <label for="sort-by" class="font-bold text-sm leading-none text-gray-500">Seřadit:</label>
    <USelect
        id="sort-by"
        class="bg-gray-700 px-3.5 py-2 flex"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        :items="[
          ...sortOptions.map((g) => ({ label: g.label, value: g.value }))
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