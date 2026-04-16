export type TaskDifficulty = "Easy" | "Medium" | "Hard";

export type TaskExample = {
  input: string;
  output: string;
  explanation: string;
};

export type Task = {
  id: string;
  title: string;
  difficulty: TaskDifficulty;
  description: string;
  examples: TaskExample[];
  starterCode: string;
  testCode: string[];
  functionName: string;
  tags: string[];
};
