import type { Task } from "../types/task";
import type { ExecutionResult } from "../types/result";

type AssertApi = {
  equal: (actual: unknown, expected: unknown, message?: string) => void;
  deepEqual: (actual: unknown, expected: unknown, message?: string) => void;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function deepEqualValue(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) {
    return true;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false;
    }

    return left.every((item, index) => deepEqualValue(item, right[index]));
  }

  if (isObject(left) && isObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    return leftKeys.every((key) => deepEqualValue(left[key], right[key]));
  }

  return false;
}

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  return JSON.stringify(value);
}

function createAssertApi(): AssertApi {
  return {
    equal(actual, expected, message) {
      if (!Object.is(actual, expected)) {
        throw new Error(
          message ??
            `Expected ${formatValue(expected)} but received ${formatValue(actual)}.`,
        );
      }
    },
    deepEqual(actual, expected, message) {
      if (!deepEqualValue(actual, expected)) {
        throw new Error(
          message ??
            `Expected ${formatValue(expected)} but received ${formatValue(actual)}.`,
        );
      }
    },
  };
}

export function runTaskCode(task: Task, code: string): ExecutionResult {
  try {
    const assert = createAssertApi();
    const evaluator = new Function("assert", `${code}\n\n${task.testCode}`);

    evaluator(assert);

    return {
      status: "success",
      passed: 1,
      failed: 0,
      messages: ["All predefined tests passed."],
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown execution error.";

    return {
      status: "error",
      passed: 0,
      failed: 1,
      messages: ["One or more tests failed."],
      error: message,
    };
  }
}
