import { MethodStatus, MethodType } from "@app/method";

const createPage = {
  form: {
    type: {
      label: "Тип",
    },
    name: {
      label: "Ім'я",
      placeholder: "Введіть ім'я...",
    },
    description: {
      label: "Опис",
      placeholder: "Введіть опис...",
    },
    submit: "Створити метод",
  },
};

const editPage = {
  completing: "Проводимо важливі розрахунки...",
  completeBtn: "Почати розрахунки (ви не зможете відмити цю дію)",
  createAnalysisBtn: "Створити аналіз",
  addPointForm: {
    okLabel: "Додати точку",
    title: "Додати точку",
    openFormBtn: "Додати нову точку",
  },
  editPointForm: {
    okLabel: "Оновити точку",
    title: "Редагування точки",
  },
  createAnalysisForm: {
    okLabel: "Створити",
    title: 'Створення аналізу для методу "{{name}}"#{{id}}',
    name: {
      label: "Ім'я аналізу",
    },
  },
};

const listPage = {
  deleteForm: {
    title: "Видалення методу з Ід #{{id}}",
    sureQuestion: "Ви впевнені, що хочете видалити цей метод?",
  },
};

const localization = {
  method: "Метод",
  labels: {
    root: "Методи",
    create: "Створити метод",
    draft: "Сирі методи",
    editable: "Редагуємі методи",
    completed: "Завершенні методи",
  },
  type: {
    [MethodType.CALIBRATION_CURVE]:
      "Калібрувальний графік з відносними значеннями",
    [MethodType.CALIBRATION_CURVE_ABSOLUTE]:
      "Калібрувальний графік з абсолютними значеннями",
  },
  status: {
    [MethodStatus.DRAFT]: "Сирий",
    [MethodStatus.EDITABLE]: "В редакції",
    [MethodStatus.COMPLETED]: "Завершенний",
    [MethodStatus.ARCHIEVED]: "Архівований",
  },
  createPage,
  editPage,
  listPage,
};

export default localization;
