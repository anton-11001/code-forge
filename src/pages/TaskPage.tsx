import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Navigate, useParams } from "react-router";
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
                    <Tab
                      label="Completed"
                      value="completed"
                      disabled={!isCompleted}
                    />
                  </Tabs>
                </Box>

                {activeTab === "description" ? (
                  <Stack spacing={3}>
                    <Typography variant="h5">Description</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {task.description}
                    </Typography>

                    <Typography variant="h5">Example</Typography>

                    <Typography variant="body2" color="text.secondary">
                      Input: {task.examples[0]?.input}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Output: {task.examples[0]?.output}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.examples[0]?.explanation}
                    </Typography>
                  </Stack>
                ) : null}

                {activeTab === "coding" ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 8 }}>
                      <Stack spacing={2}>
                        <CodeEditor value={code} onChange={handleCodeChange} />
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, xl: 4 }}>
                      <ResultPanel result={result} />
                    </Grid>

                    <Button
                      sx={{ maxWidth: 200, marginLeft: "auto" }}
                      variant="contained"
                      onClick={handleRunCode}
                    >
                      Run Code
                    </Button>
                  </Grid>
                ) : null}

                {activeTab === "completed" ? (
                  <Stack spacing={2}>
                    <Typography variant="h5">
                      Task completed. Your solution passed the tests. Nice work.
                      This one is marked as done.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      You can stay here, go back to coding, return to the task
                      list, or move on to the next challenge.
                    </Typography>
                  </Stack>
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
