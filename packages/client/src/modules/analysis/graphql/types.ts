import { AnalysisStatus } from "@app/method";

export type Analysis = {
  id: number;
  methodId: number;
  userId: number;
  status: AnalysisStatus;
  createdAt: Date;
  updatedAt: Date;
};
