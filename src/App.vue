<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import Calendar from "./components/Calendar.vue";
import Select from "./components/Select.vue";

const { locale } = useI18n();
const data = ref<string>();

const localeList = [
  { label: "English", value: "en" },
  { label: "Русский", value: "ru" },
];

const handleSelect = (date: Date) => {
  data.value = date.toLocaleDateString(locale.value);
};
</script>

<template>
  <main>
    <span v-if="data">{{ data }}</span>
    <Select v-model="locale" :option="localeList" />
    <Calendar v-model="data" currentDate="2025-11-4" @select="handleSelect" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
