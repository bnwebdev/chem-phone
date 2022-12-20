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

const localization = {
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
};

export default localization;
