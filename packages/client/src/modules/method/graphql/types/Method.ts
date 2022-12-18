import { MethodData, MethodStatus, MethodType } from "@app/method";

export type Method = {
  id: number;
  userId: number;
  type: MethodType;
  data: MethodData;
  status: MethodStatus;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
};
