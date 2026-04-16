import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { Task } from "../types/task";

type TaskListProps = {
  tasks: Task[];
  completedTaskIds?: string[];
};

const difficultyColorMap: Record<Task["difficulty"], "success" | "warning" | "error"> =
  {
    Easy: "success",
    Medium: "warning",
    Hard: "error",
  };

export function TaskList({ tasks, completedTaskIds = [] }: TaskListProps) {
  return (
    <Card variant="outlined">
      <CardHeader
        title="Tasks"
        subheader="Choose a challenge to open its dedicated task page."
      />
      <CardContent>
        <List disablePadding>
          {tasks.map((task) => {
            const isCompleted = completedTaskIds.includes(task.id);

            return (
              <ListItem key={task.id} disablePadding>
                <ListItemButton component={RouterLink} to={`/tasks/${task.id}`}>
                  <Box sx={{ width: "100%" }}>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle1">{task.title}</Typography>
                        {isCompleted ? (
                          <Chip size="small" color="success" label="Completed" />
                        ) : null}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {task.description}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip
                          size="small"
                          color={difficultyColorMap[task.difficulty]}
                          label={task.difficulty}
                        />
                        {task.tags.map((tag) => (
                          <Chip
                            key={tag}
                            size="small"
                            variant="outlined"
                            label={tag}
                          />
                        ))}
                      </Box>
                    </Stack>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
