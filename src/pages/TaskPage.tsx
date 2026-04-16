import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router";
import { CodeEditor } from "../components/CodeEditor";
import { ResultPanel } from "../components/ResultPanel";
import { tasks } from "../tasks";
import type { ExecutionResult } from "../types/result";
import {
  isTaskCompleted,
  markTaskAsCompleted,
} from "../utils/taskCompletion";
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
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7efe5 0%, rgba(247, 239, 229, 0.96) 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Button
            component={Link}
            to="/"
            variant="text"
            sx={{ alignSelf: "flex-start", px: 0 }}
          >
            Back to tasks
          </Button>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(10px)",
            }}
          >
            {showCompletedView ? (
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: "success.main", fontWeight: 700, letterSpacing: 2 }}
                  >
                    Challenge Completed
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
                    {task.title}
                  </Typography>
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    background:
                      "linear-gradient(135deg, rgba(76, 175, 80, 0.14) 0%, rgba(255,255,255,0.96) 100%)",
                    borderColor: "success.light",
                  }}
                >
                  <Stack spacing={3}>
                    <Alert severity="success">
                      Task completed. Your solution passed the current predefined
                      test.
                    </Alert>

                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                        Nice work. This one is marked as done.
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        This completed view is separate from the coding workspace,
                        so you can celebrate the win first and only go back to the
                        editor if you want to refine the solution.
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Chip label={task.difficulty} color="primary" />
                      <Chip label="Completed" color="success" />
                      {task.tags.map((tag) => (
                        <Chip key={tag} label={tag} variant="outlined" />
                      ))}
                    </Stack>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1.5,
                      }}
                    >
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
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}
                  >
                    Challenge
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
                    {task.title}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                  <Chip label={task.difficulty} color="primary" />
                  {isCompleted ? <Chip label="Completed" color="success" /> : null}
                  {task.tags.map((tag) => (
                    <Chip key={tag} label={tag} variant="outlined" />
                  ))}
                </Stack>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {task.description}
                  </Typography>
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: "rgba(118, 75, 33, 0.04)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    Example
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Input: {task.examples[0]?.input}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Output: {task.examples[0]?.output}
                  </Typography>
                  {task.examples[0]?.explanation ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {task.examples[0].explanation}
                    </Typography>
                  ) : null}
                </Paper>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 320px" },
                    gap: 2,
                    alignItems: "start",
                  }}
                >
                  <Stack spacing={2}>
                    <CodeEditor value={code} onChange={handleCodeChange} />

                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 1.5,
                          justifyContent: "space-between",
                          alignItems: { xs: "stretch", sm: "center" },
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            Predefined test
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            The current MVP runs the built-in test snippet for this
                            task in the browser.
                          </Typography>
                        </Box>
                        <Button variant="contained" onClick={handleRunCode}>
                          Run Code
                        </Button>
                      </Box>
                    </Paper>
                  </Stack>

                  <ResultPanel result={result} />
                </Box>
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default TaskPage;
