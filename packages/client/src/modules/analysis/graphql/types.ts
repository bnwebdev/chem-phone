import { AnalysisStatus } from "@app/method";

export type AnalysisData = {
  raw?: string;
  color: [number, number, number, number];
  result?: number;
  resultUnit?: string;
};

export type Analysis = {
  id: number;
  name: string;
  methodId: number;
  userId: number;
  status: AnalysisStatus;
  createdAt: Date;
  updatedAt: Date;
  details?: string;
  data: AnalysisData[];
};
