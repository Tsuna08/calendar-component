import { createI18n } from "vue-i18n";

const messages = {
  en: {
    datePlaceholder: "MM/DD/YYYY",
    daysOfWeek: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
    months: "January,February,March,April,May,June,July,August,September,October,November,December",
  },
  ru: {
    datePlaceholder: "ДД.ММ.ГГГГ",
    daysOfWeek: "Вс,Пн,Вт,Ср,Чт,Пт,Сб",
    months: "Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь",
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});
