import { MethodStatus, MethodType } from "@app/method";

const createPage = {
  form: {
    type: {
      label: "Type",
    },
    submit: "Create Method",
  },
};

const localization = {
  labels: {
    root: "Methods",
    create: "Create Method",
    draft: "Draft Methods",
    editable: "Editable Methods",
    completed: "Completed Methods",
  },
  type: {
    [MethodType.CALIBRATION_CURVE]: "Calibration curve",
  },
  status: {
    [MethodStatus.DRAFT]: "Draft",
    [MethodStatus.EDITABLE]: "Editable",
    [MethodStatus.COMPLETED]: "Completed",
    [MethodStatus.ARCHIEVED]: "Archieved",
  },
  createPage,
};

export default localization;
