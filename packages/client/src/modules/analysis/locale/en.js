import { AnalysisStatus } from "@app/method";

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
};

export default localization;
