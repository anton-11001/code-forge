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
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">
              Choose a kata-style challenge to solve.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start from the task list, open a challenge page, then write and
              run your solution there.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed: {completedTaskIds.length} / {tasks.length}
            </Typography>
          </Stack>

          <TaskList tasks={tasks} completedTaskIds={completedTaskIds} />
        </Stack>
      </Box>
    </Container>
  );
}

export default TaskListPage;
