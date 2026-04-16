export type ExecutionStatus = "idle" | "success" | "error";

export type ExecutionResult = {
  status: ExecutionStatus;
  passed: number;
  failed: number;
  messages: string[];
  error?: string;
};
