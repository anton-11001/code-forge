import { Suspense, lazy } from "react";
import { Box, CircularProgress, Paper, Typography, useTheme } from "@mui/material";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const theme = useTheme();
  const editorTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Solution
        </Typography>
      </Box>

      <Box sx={{ height: { xs: 360, md: 460 } }}>
        <Suspense
          fallback={
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "background.paper",
              }}
            >
              <CircularProgress size={28} />
            </Box>
          }
        >
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            language="javascript"
            value={value}
            onChange={(nextValue) => onChange(nextValue ?? "")}
            theme={editorTheme}
            options={{
              automaticLayout: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 16 },
            }}
          />
        </Suspense>
      </Box>
    </Paper>
  );
}
