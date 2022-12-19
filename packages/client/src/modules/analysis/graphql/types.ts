import { AnalysisStatus } from "@app/method";

export type Analysis = {
  id: number;
  name: string;
  methodId: number;
  userId: number;
  status: AnalysisStatus;
  createdAt: Date;
  updatedAt: Date;
};
