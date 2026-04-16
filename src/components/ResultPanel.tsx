import { Alert, Paper, Stack, Typography } from "@mui/material";
import type { ExecutionResult } from "../types/result";

type ResultPanelProps = {
  result: ExecutionResult | null;
};

export function ResultPanel({ result }: ResultPanelProps) {
  if (!result) {
    return (
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Results
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Run your code to see test results and runtime feedback here.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
      <Stack spacing={1.5}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Results
        </Typography>

        <Alert severity={result.status === "success" ? "success" : "error"}>
          Passed: {result.passed} | Failed: {result.failed}
        </Alert>

        {result.messages.map((message) => (
          <Typography key={message} variant="body2" color="text.secondary">
            {message}
          </Typography>
        ))}

        {result.error ? (
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "rgba(143, 91, 47, 0.04)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
            >
              {result.error}
            </Typography>
          </Paper>
        ) : null}
      </Stack>
    </Paper>
  );
}
