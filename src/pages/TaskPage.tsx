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
  Tab,
  Tabs,
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
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!task) {
      return;
    }

    const savedCode = window.localStorage.getItem(`codeforge:${task.id}`);
    setCode(savedCode ?? task.starterCode);
    setResult(null);
    const completed = isTaskCompleted(task.id);
    setIsCompleted(completed);
    setActiveTab(completed ? "completed" : "description");
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
      setActiveTab("completed");
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
              <Stack spacing={3}>
                <Stack spacing={1}>
                  <Typography
                    variant="overline"
                    color={isCompleted ? "success" : "primary"}
                  >
                    {isCompleted ? "Challenge Completed" : "Challenge"}
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

                <Box>
                  <Tabs
                    value={activeTab}
                    onChange={(_, newValue: string) => setActiveTab(newValue)}
                    aria-label="task tabs"
                  >
                    <Tab label="Description" value="description" />
                    <Tab label="Coding" value="coding" />
                    <Tab label="Completed" value="completed" />
                  </Tabs>
                </Box>

                {activeTab === "description" ? (
                  <Stack spacing={3}>
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
                  </Stack>
                ) : null}

                {activeTab === "coding" ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 8 }}>
                      <Stack spacing={2}>
                        <CodeEditor value={code} onChange={handleCodeChange} />

                        <Button
                          sx={{ maxWidth: 200 }}
                          variant="contained"
                          onClick={handleRunCode}
                        >
                          Run Code
                        </Button>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, xl: 4 }}>
                      <ResultPanel result={result} />
                    </Grid>
                  </Grid>
                ) : null}

                {activeTab === "completed" ? (
                  <Card variant="outlined">
                    <CardHeader title="Completed" />
                    <CardContent>
                      {isCompleted ? (
                        <Stack spacing={2}>
                          <Alert severity="success">
                            Task completed. Your solution passed the tests.
                          </Alert>
                          <Typography variant="h5">
                            Nice work. This one is marked as done.
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            You can stay here, go back to coding, return to the
                            task list, or move on to the next challenge.
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack spacing={2}>
                          <Alert severity="info">
                            This task is not completed yet.
                          </Alert>
                          <Typography variant="body1" color="text.secondary">
                            Write your solution in the Coding tab and pass all
                            tests to unlock the completed state.
                          </Typography>
                        </Stack>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        onClick={() => setActiveTab("coding")}
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
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}

export default TaskPage;
