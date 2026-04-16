const COMPLETED_TASKS_KEY = "codeforge:completedTasks";

export function getCompletedTaskIds(): string[] {
  const rawValue = window.localStorage.getItem(COMPLETED_TASKS_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue)
      ? parsedValue.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function isTaskCompleted(taskId: string): boolean {
  return getCompletedTaskIds().includes(taskId);
}

export function markTaskAsCompleted(taskId: string): string[] {
  const completedTaskIds = getCompletedTaskIds();

  if (completedTaskIds.includes(taskId)) {
    return completedTaskIds;
  }

  const nextCompletedTaskIds = [...completedTaskIds, taskId];
  window.localStorage.setItem(
    COMPLETED_TASKS_KEY,
    JSON.stringify(nextCompletedTaskIds),
  );

  return nextCompletedTaskIds;
}
