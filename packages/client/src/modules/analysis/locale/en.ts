import { AnalysisStatus } from "@app/method";

const createPage = {
  header: "Create Analysis",
  form: {
    selectMethod: "Select method",
    name: "Analysis name",
    details: "Analysis details",
    detailsPlaceholder: "Type details...",
    submit: "Create",
  },
};

const editPage = {
  columns: {
    result: "Result",
  },
  computeBtn: "Compute",
  computingBtn: "Computing...",
  pickColorBtn: "Pick color",
  pickColorTitle: "Pick color",
  errors: {
    colorRequired: `All fields of color are required`,
  },
  pickBtn: "Pick",
  cancelBtn: "Cancel",
};

const listPage = {
  columns: {
    methodId: "Method Id",
  },
};

const localization = {
  analysis: {
    whoami: "Analysis",
    details: "Analysis details",
  },
  labels: {
    root: "Analyses",
    create: "Create Analysis",
    draft: "Draft Analyses",
    completed: "Completed Analyses",
  },
  status: {
    [AnalysisStatus.DRAFT]: "Draft",
    [AnalysisStatus.COMPLETED]: "Completed",
    [AnalysisStatus.ARCHIEVED]: "Archieved",
  },
  createPage,
  editPage,
  listPage,
};

export default localization;
