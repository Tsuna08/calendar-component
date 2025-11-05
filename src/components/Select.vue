<script setup lang="ts">
interface Props {
  option: { label: string; value: string }[];
}

const data = defineModel<string>();
const { option } = defineProps<Props>();
</script>

<template>
  <select v-model="data">
    <option v-for="item in option" :key="item.value" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<style scoped>
select {
  width: -webkit-fill-available;
  padding: 8px;
  background: transparent;
  color: var(--color);
  border-radius: 4px;
  border: 1px solid var(--color-third);
}

option {
  background: var(--background);
  color: var(--color-secondary);
}
</style>
