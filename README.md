**Implementation plan**

Build an MVP first with a very small and predictable flow: task list, task details, code editor, tests, and result output.

Start with the core screens and layout:

- Left sidebar or top panel with the list of tasks
- Main content area with the selected task description
- Code editor for the user solution
- Test editor or predefined test section
- Output panel for test results, errors, and success state

Define the task data structure first. Since you want to hardcode tasks manually, each task should contain:

- id
- title
- difficulty
- description
- examples
- starterCode
- testCode
- functionName
- tags

Create a hardcoded tasks file, for example:

- `tasks.ts`
- array of task objects
  This will let you easily add new challenges without building an admin panel or backend.

Implement the main feature blocks in this order.

**1. Task selection block**
Create a task list component that shows:

- task title
- difficulty
- tags
- selected state

When a user clicks a task, load its full content into the main area.

**2. Task description block**
Create a challenge details component that renders:

- title
- problem description
- input/output explanation
- examples
- constraints
- notes

This block should be read-only and update when the selected task changes.

**3. Code writing block**
Use a code editor component such as Monaco Editor.
This area should:

- preload starter code for the selected task
- allow editing
- preserve code per task if needed
- support syntax highlighting

For MVP, focus on JavaScript first. Later you can add TypeScript or other languages.

**4. Test block**
Create a separate section for tests.
You have two possible modes:

- hidden predefined tests
- editable visible tests

For your first version, better use predefined hardcoded tests and only show the result output.
If you want a more Codewars-like feeling later, add visible sample tests and hidden validation tests.

**5. Code execution block**
You need a safe way to run user code against tests.
For MVP, the easiest approach is:

- run only JavaScript
- execute in-browser with a controlled sandboxed approach

Possible options:

- `new Function()` for very basic prototype
- isolated iframe sandbox
- backend execution service for safer long-term solution

For a real app, backend execution is better because running arbitrary code in the browser is limited and risky.

**6. Results block**
After clicking Run or Submit, show:

- passed tests count
- failed tests count
- assertion messages
- runtime errors
- success message

This block should be very clear and easy to scan.

**7. State management**
You need state for:

- selected task
- user code per task
- execution status
- test results
- loading/error state

For MVP, React local state is enough.
If the app grows, move to Zustand or Redux Toolkit.

**8. Suggested component structure**

- `App`
- `TaskList`
- `TaskListItem`
- `TaskDetails`
- `CodeEditor`
- `TestPanel`
- `ResultPanel`
- `RunControls`

**9. Suggested folder structure**

- `components/`
- `data/`
- `types/`
- `utils/`
- `hooks/`

Example:

- `data/tasks.ts`
- `types/task.ts`
- `utils/runTests.ts`

**10. Development phases**

Phase 1:

- hardcoded tasks
- task selection
- description view
- code editor
- simple run button
- simple test results

Phase 2:

- save user code in localStorage
- add difficulty filters
- add task search
- add better test reporting

Phase 3:

- hidden tests
- submission history
- progress tracking
- theming
- user authentication if needed

**Recommended stack**

- React
- TypeScript
- Vite
- Monaco Editor
- Zustand if state grows
- CSS Modules, Tailwind, or MUI depending on your preference

**Best MVP flow**
User opens app → selects task from list → reads description → writes code → clicks Run → sees test results.

**Short product definition**
CodeForge is a coding challenge app where users pick a task, read the problem statement, write code, run tests, and see the results in one interface.
