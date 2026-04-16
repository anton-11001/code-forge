import type { Task } from "../../types/task";

export const sortArrayAscendingTask: Task = {
  id: "sort-array-ascending",
  title: "Sort Array Ascending",
  difficulty: "Easy",
  description:
    "Return a new array sorted from the smallest number to the largest number.",
  examples: [
    {
      input: "[9, 3, 7, 1, 5]",
      output: "[1, 3, 5, 7, 9]",
      explanation: "The array should be sorted in ascending numeric order.",
    },
  ],
  starterCode: `function sortArrayAscending(numbers) {
  // sort numbers from smallest to largest
}`,
  testCode: [
    `assert.deepEqual(sortArrayAscending([9, 3, 7, 1, 5]), [1, 3, 5, 7, 9]);`,
    `assert.deepEqual(sortArrayAscending([1, 2, 3]), [1, 2, 3]);`,
    `assert.deepEqual(sortArrayAscending([5, 5, 2, 2, 1]), [1, 2, 2, 5, 5]);`,
    `assert.deepEqual(sortArrayAscending([-3, 0, 10, -1]), [-3, -1, 0, 10]);`,
    `assert.deepEqual(sortArrayAscending([]), []);`,
  ],
  functionName: "sortArrayAscending",
  tags: ["Array", "Sorting"],
};
