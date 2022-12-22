import { MethodStatus, MethodType } from "@app/method";

const createPage = {
  form: {
    type: {
      label: "Type",
    },
    name: {
      label: "Name",
      placeholder: "Input name...",
    },
    description: {
      label: "Description",
      placeholder: "Input description...",
    },
    submit: "Create Method",
  },
};

const editPage = {
  completing: "Completing...",
  completeBtn: "Complete (you will not be able to undo this action)",
  createAnalysisBtn: "Create analysis",
  addPointForm: {
    okLabel: "Edit point",
    title: "Add point",
    openFormBtn: "Add new point",
  },
  editPointForm: {
    okLabel: "Update point",
    title: "Edit point",
  },
  createAnalysisForm: {
    okLabel: "Create",
    title: 'Create analysis for method "{{name}}"#{{id}}',
    name: {
      label: "Analysis name",
    },
  },
};

const listPage = {};

const localization = {
  method: "Method",
  labels: {
    root: "Methods",
    create: "Create Method",
    draft: "Draft Methods",
    editable: "Editable Methods",
    completed: "Completed Methods",
  },
  type: {
    [MethodType.CALIBRATION_CURVE]: "Calibration curve",
    [MethodType.CALIBRATION_CURVE_ABSOLUTE]:
      "Calibration curve with absolute values",
  },
  status: {
    [MethodStatus.DRAFT]: "Draft",
    [MethodStatus.EDITABLE]: "Editable",
    [MethodStatus.COMPLETED]: "Completed",
    [MethodStatus.ARCHIEVED]: "Archieved",
  },
  createPage,
  editPage,
  listPage,
};

export default localization;
