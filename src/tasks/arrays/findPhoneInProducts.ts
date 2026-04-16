import type { Task } from "../../types/task";

export const findPhoneInProductsTask: Task = {
  id: "find-phone-in-products",
  title: "Find Phone In Product Names",
  difficulty: "Easy",
  description:
    'Check whether the array of product names contains the string "phone" and return true or false.',
  examples: [
    {
      input: '["laptop", "mouse", "phone", "keyboard"]',
      output: "true",
      explanation: 'The value "phone" exists in the array, so the result is true.',
    },
  ],
  starterCode: `function findPhoneInProducts(products) {
  // return true if "phone" exists in the array
}`,
  testCode: [
    `assert.equal(findPhoneInProducts(["laptop", "mouse", "phone", "keyboard"]), true);`,
    `assert.equal(findPhoneInProducts(["phone"]), true);`,
    `assert.equal(findPhoneInProducts(["laptop", "mouse", "keyboard"]), false);`,
    `assert.equal(findPhoneInProducts([]), false);`,
    `assert.equal(findPhoneInProducts(["Phone", "mouse"]), false);`,
  ],
  functionName: "findPhoneInProducts",
  tags: ["Array", "Search"],
};
