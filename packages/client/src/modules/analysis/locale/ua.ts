import { AnalysisStatus } from "@app/method";

const createPage = {
  header: "Створити Аналіз",
  form: {
    selectMethod: "Оберіть метод",
    name: "Ім'я аналізу",
    details: "Деталі аналізу",
    detailsPlaceholder: "Ввести інформацію...",
    submit: "Створити",
  },
};

const editPage = {
  columns: {
    result: "Результати",
  },
  computeBtn: "Почати розрахунок",
  computingBtn: "Лічимо до 5, бо не можемо...",
  pickColorBtn: "Взяти колір",
  pickColorTitle: "Відбір кольору",
  errors: {
    colorRequired: `Всі поля кольору обовязкові!`,
  },
  pickBtn: "Взяти",
  cancelBtn: "Залишити",
};

const listPage = {
  columns: {
    methodId: "Ід методу",
  },
};

const localization = {
  analysis: {
    whoami: "Аналіз",
    details: "Деталі аналізу",
  },
  labels: {
    root: "Аналізи",
    create: "Створити аналіз",
    draft: "Сирі аналізи",
    completed: "Проведені аналізи",
  },
  status: {
    [AnalysisStatus.DRAFT]: "Сирий",
    [AnalysisStatus.COMPLETED]: "Завершений",
    [AnalysisStatus.ARCHIEVED]: "Заархівований",
  },
  createPage,
  editPage,
  listPage,
};

export default localization;
