import { Outlet } from "react-router";
import { AppHeader } from "./components/AppHeader";

function App() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

export default App;
