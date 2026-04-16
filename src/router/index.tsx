import { createBrowserRouter } from "react-router";
import App from "../App";
import TaskListPage from "../pages/TaskListPage";
import TaskPage from "../pages/TaskPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskListPage />,
      },
      {
        path: "tasks/:taskId",
        element: <TaskPage />,
      },
    ],
  },
]);

export default router;
