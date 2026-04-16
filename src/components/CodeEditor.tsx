import { Suspense, lazy } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  useTheme,
} from "@mui/material";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const theme = useTheme();
  const editorTheme = theme.palette.mode === "dark" ? "vs-dark" : "light";

  return (
    <Card variant="outlined">
      <CardHeader title="Solution" />
      <CardContent>
        <Box sx={{ height: 460 }}>
          <Suspense
            fallback={
              <Stack
                sx={{
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={28} />
              </Stack>
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
      </CardContent>
    </Card>
  );
}
