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
  chooseCurveBuilder: "Choose curve builder and create calibration curve",
  curveBuilder: {
    rawData: "Use raw data",
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
  editPage,
};

export default localization;
