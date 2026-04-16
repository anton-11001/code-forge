import type { Task } from "../../types/task";

export const filterEvenNumbersTask: Task = {
  id: "filter-even-numbers",
  title: "Filter Even Numbers",
  difficulty: "Easy",
  description:
    "Return a new array containing only the even numbers from the input array.",
  examples: [
    {
      input: "[1, 2, 3, 4, 5, 6]",
      output: "[2, 4, 6]",
      explanation: "Only numbers divisible by 2 should remain in the result.",
    },
  ],
  starterCode: `function filterEvenNumbers(numbers) {
  // return only even numbers
}`,
  testCode: [
    `assert.deepEqual(filterEvenNumbers([1, 2, 3, 4, 5, 6]), [2, 4, 6]);`,
    `assert.deepEqual(filterEvenNumbers([2, 4, 6]), [2, 4, 6]);`,
    `assert.deepEqual(filterEvenNumbers([1, 3, 5]), []);`,
    `assert.deepEqual(filterEvenNumbers([]), []);`,
    `assert.deepEqual(filterEvenNumbers([-4, -3, -2, -1, 0, 1]), [-4, -2, 0]);`,
  ],
  functionName: "filterEvenNumbers",
  tags: ["Array", "Filter"],
};
