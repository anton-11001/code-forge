import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8b5e34",
    },
    background: {
      default: "#f2ebe3",
      paper: "#fffdf9",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h3: {
      fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
      lineHeight: 1.05,
    },
  },
});

export default theme;
