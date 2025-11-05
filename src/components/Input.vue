<script setup lang="ts">
interface Props {
  placeholder: string;
  type?: string;
}

const data = defineModel<string>();
const { placeholder, type = "text" } = defineProps<Props>();
</script>

<template>
  <input v-model="data" :type="type" :placeholder="placeholder" />
</template>

<style scoped>
input {
  width: -webkit-fill-available;
  padding: 8px;
  background: transparent;
  color: var(--color);
  border-radius: 4px;
  border: 1px solid var(--color-third);
}
</style>
