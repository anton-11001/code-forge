import { Button } from "@mui/material";
import { useThemeMode } from "../theme/ThemeModeContext";

export function ThemeModeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Button variant="outlined" onClick={toggleMode}>
      {mode === "light" ? "Dark mode" : "Light mode"}
    </Button>
  );
}
