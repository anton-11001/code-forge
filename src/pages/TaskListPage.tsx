import { useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { TaskList } from "../components/TaskList";
import { tasks } from "../tasks";
import { getCompletedTaskIds } from "../utils/taskCompletion";

function TaskListPage() {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedTaskIds(getCompletedTaskIds());
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #fff4e6 0%, #f7efe5 38%, #f2ebe3 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 2 }}
            >
              CodeForge
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, maxWidth: 760, mb: 1.5 }}
            >
              Choose a kata-style challenge to solve.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 720 }}
            >
              Start from the task list, open a challenge page, then write and
              run your solution there.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Completed: {completedTaskIds.length} / {tasks.length}
            </Typography>
          </Box>

          <TaskList tasks={tasks} completedTaskIds={completedTaskIds} />
        </Stack>
      </Container>
    </Box>
  );
}

export default TaskListPage;
