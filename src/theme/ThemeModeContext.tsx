import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  type PaletteMode,
} from "@mui/material";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeModeContextValue = {
  mode: PaletteMode;
  toggleMode: () => void;
};

const STORAGE_KEY = "codeforge:themeMode";

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(
  undefined,
);

function getInitialMode(): PaletteMode {
  const savedMode = window.localStorage.getItem(STORAGE_KEY);

  if (savedMode === "light" || savedMode === "dark") {
    return savedMode;
  }

  return "light";
}

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      // primary: {
      //   main: "#8b5e34",
      // },
    },
  });

  const value = {
    mode,
    toggleMode,
  };

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error("useThemeMode must be used within AppThemeProvider.");
  }

  return context;
}
