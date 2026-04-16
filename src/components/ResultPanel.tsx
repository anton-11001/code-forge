import { Alert, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import type { ExecutionResult } from "../types/result";

type ResultPanelProps = {
  result: ExecutionResult | null;
};

export function ResultPanel({ result }: ResultPanelProps) {
  if (!result) {
    return (
      <Card variant="outlined">
        <CardHeader title="Results" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Run your code to see test results and runtime feedback here.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Results" />
      <CardContent>
        <Stack spacing={2}>
          <Alert severity={result.status === "success" ? "success" : "error"}>
            Passed: {result.passed} | Failed: {result.failed}
          </Alert>

          {result.messages.map((message) => (
            <Typography key={message} variant="body2" color="text.secondary">
              {message}
            </Typography>
          ))}

          {result.error ? (
            <Alert severity="warning">
              <Typography variant="body2">{result.error}</Typography>
            </Alert>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
