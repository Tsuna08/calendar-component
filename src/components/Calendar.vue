<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import Input from "./Input.vue";

const DAYS_IN_SIX_WEEK = 42;

const { locale, t } = useI18n();

const { currentDate } = defineProps<{ currentDate: string }>();
const emit = defineEmits<{ (e: "select", date: Date): void }>();

watch(
  () => currentDate,
  (newDate) => {
    current.value = new Date(newDate);
    selectedDay.value = new Date(newDate).toLocaleDateString(locale.value);
  },
);

const current = ref<Date>(new Date(currentDate));
const selectedDay = ref<string>(new Date(currentDate).toLocaleDateString(locale.value));
const isShowCalendar = ref(false);

const placeholder = computed(() => t("datePlaceholder"));
const daysOfWeek = computed(() => t("daysOfWeek").split(","));
const months = computed(() => t("months").split(","));
const showDate = computed(
  () => months.value[current.value.getMonth()] + " " + current.value.getFullYear(),
);
const days = computed(() => {
  const year = current.value.getFullYear();
  const month = current.value.getMonth();

  const days = [];
  const firstDay = new Date(year, month, 1);

  for (let i = 0; i < DAYS_IN_SIX_WEEK; i++) {
    const date = new Date(year, month, i - firstDay.getDay() + 1);

    if (date.getMonth() != month) {
      days.push(undefined);
    } else {
      days.push({
        date,
        dayNumber: date.getDate(),
        isToday: date.toDateString() === new Date().toDateString(),
        isCurrentMonth: date.getMonth() === month,
      });
    }
  }

  return days;
});

const showCalendar = () => {
  isShowCalendar.value = !isShowCalendar.value;
};

const changeMonth = (offset: number) => {
  current.value = new Date(current.value.getFullYear(), current.value.getMonth() + offset, 1);
};

const selectDay = (day: Date) => {
  emit("select", day);
  selectedDay.value = day.toLocaleDateString(locale.value);
  isShowCalendar.value = false;
};

const selectDayByEnter = (event: KeyboardEvent) => {
  if (event.code !== "Enter") return;

  const target = event?.target as HTMLElement;
  selectDay(new Date(target.textContent));
};
</script>

<template>
  <div>
    <Input
      v-model="selectedDay"
      :placeholder="placeholder"
      readonly
      @click="showCalendar"
      @keyup="showCalendar"
    />
    <div v-if="isShowCalendar" class="calendar">
      <div class="navigation">
        <button @click="changeMonth(-1)">‹</button>
        <label>{{ showDate }}</label>
        <button @click="changeMonth(1)">›</button>
      </div>

      <div class="weekNames">
        <span v-for="day in daysOfWeek" :key="day">
          {{ day }}
        </span>
      </div>
      <div class="days">
        <div v-for="day in days" :key="day?.date.toString()">
          <span
            v-if="day"
            class="day"
            :class="{
              today: day.isToday,
              activeDay: day.date.toLocaleDateString() === selectedDay,
            }"
            tabindex="0"
            @click="selectDay(day.date)"
            @keyup="selectDayByEnter"
            >{{ day.dayNumber }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calendar {
  width: 300px;
  border: 1px solid var(--color-third);
  border-radius: 4px;
  padding: 0.5rem;
  position: absolute;
  background-color: var(--background-color);
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  label {
    min-width: 108px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    text-align: center;

    &:hover {
      color: var(--color-active);
    }
  }
}

.weekNames {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  height: 250px;
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  box-sizing: border-box;

  &:hover {
    border: 1px solid var(--color-active);
    border-radius: 4px;
    cursor: pointer;
  }
}

.today {
  border: 1px solid var(--color-active);
  border-radius: 4px;
}

.activeDay {
  border: 1px solid var(--color-third);
  border-radius: 4px;
}
</style>
