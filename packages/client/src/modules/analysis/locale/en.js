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
    color: "Color",
    result: "Result",
    actions: "Actions",
  },
  actions: {
    delete: "Delete",
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
    id: "Id",
    name: "Name",
    methodId: "Method Id",
    createdAt: "Created At",
    updatedAt: "Updated At",
    status: "Status",
    actions: "Actions",
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
