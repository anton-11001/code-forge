import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router";
import { CodeEditor } from "../components/CodeEditor";
import { ResultPanel } from "../components/ResultPanel";
import { tasks } from "../tasks";
import type { ExecutionResult } from "../types/result";
import { isTaskCompleted, markTaskAsCompleted } from "../utils/taskCompletion";
import { runTaskCode } from "../utils/runTaskCode";

function TaskPage() {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletedView, setShowCompletedView] = useState(false);

  useEffect(() => {
    if (!task) {
      return;
    }

    const savedCode = window.localStorage.getItem(`codeforge:${task.id}`);
    setCode(savedCode ?? task.starterCode);
    setResult(null);
    const completed = isTaskCompleted(task.id);
    setIsCompleted(completed);
    setShowCompletedView(completed);
  }, [task]);

  if (!task) {
    return <Navigate to="/" replace />;
  }

  const handleCodeChange = (nextValue: string) => {
    setCode(nextValue);
    window.localStorage.setItem(`codeforge:${task.id}`, nextValue);
  };

  const handleRunCode = () => {
    const executionResult = runTaskCode(task, code);
    setResult(executionResult);

    if (executionResult.status === "success") {
      markTaskAsCompleted(task.id);
      setIsCompleted(true);
      setShowCompletedView(true);
    }
  };

  const currentTaskIndex = tasks.findIndex((item) => item.id === task.id);
  const nextTask = tasks[currentTaskIndex + 1] ?? null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              {showCompletedView ? (
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <Typography variant="overline" color="success">
                      Challenge Completed
                    </Typography>
                    <Typography variant="h4">{task.title}</Typography>
                  </Stack>

                  <Card variant="outlined">
                    <CardHeader title="Completed" />
                    <CardContent>
                      <Stack spacing={2}>
                        <Alert severity="success">
                          Task completed. Your solution passed the tests.
                        </Alert>
                        <Typography variant="h5">
                          Nice work. This one is marked as done.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          This completed view is separate from the coding
                          workspace, so you can celebrate the win first and only
                          go back to the editor if you want to refine the
                          solution.
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip label={task.difficulty} color="primary" />
                          <Chip label="Completed" color="success" />
                          {task.tags.map((tag) => (
                            <Chip key={tag} label={tag} variant="outlined" />
                          ))}
                        </Box>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        onClick={() => setShowCompletedView(false)}
                      >
                        Back to solution
                      </Button>
                      {nextTask ? (
                        <Button
                          component={Link}
                          to={`/tasks/${nextTask.id}`}
                          variant="contained"
                          color="success"
                        >
                          Next Task
                        </Button>
                      ) : null}
                      <Button component={Link} to="/" variant="outlined">
                        Back to task list
                      </Button>
                    </CardActions>
                  </Card>
                </Stack>
              ) : (
                <Stack spacing={3}>
                  <Stack spacing={1}>
                    <Typography variant="overline" color="primary">
                      Challenge
                    </Typography>
                    <Typography variant="h4">{task.title}</Typography>
                  </Stack>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label={task.difficulty} color="primary" />
                    {isCompleted ? (
                      <Chip label="Completed" color="success" />
                    ) : null}
                    {task.tags.map((tag) => (
                      <Chip key={tag} label={tag} variant="outlined" />
                    ))}
                  </Box>

                  <Card variant="outlined">
                    <CardHeader title="Description" />
                    <CardContent>
                      <Typography variant="body1" color="text.secondary">
                        {task.description}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card variant="outlined">
                    <CardHeader title="Example" />
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Input: {task.examples[0]?.input}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Output: {task.examples[0]?.output}
                        </Typography>
                        {task.examples[0]?.explanation ? (
                          <Typography variant="body2" color="text.secondary">
                            {task.examples[0].explanation}
                          </Typography>
                        ) : null}
                      </Stack>
                    </CardContent>
                  </Card>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 8 }}>
                      <Stack spacing={2}>
                        <CodeEditor value={code} onChange={handleCodeChange} />

                        <Card variant="outlined">
                          <CardHeader title="Tests" />
                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              This task runs {task.testCode.length}
                              tests in the browser.
                            </Typography>
                          </CardContent>
                          <Divider />
                          <CardActions>
                            <Button variant="contained" onClick={handleRunCode}>
                              Run Code
                            </Button>
                          </CardActions>
                        </Card>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, xl: 4 }}>
                      <ResultPanel result={result} />
                    </Grid>
                  </Grid>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}

export default TaskPage;
