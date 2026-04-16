import { createBrowserRouter } from "react-router";
import App from "../App";
// import { lazy } from "react";

// const Example = lazy(() => import("../Example"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/example",
    element: <div>Example</div>,
  },
]);

export default router;
