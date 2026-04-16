import {
  Box,
  Chip,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import type { Task } from "../types/task";

type TaskListProps = {
  tasks: Task[];
};

const difficultyColorMap: Record<Task["difficulty"], "success" | "warning" | "error"> =
  {
    Easy: "success",
    Medium: "warning",
    Hard: "error",
  };

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Tasks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose a challenge to open its dedicated task page.
        </Typography>
      </Box>

      <List disablePadding>
        {tasks.map((task) => {
          return (
            <ListItemButton
              key={task.id}
              component={RouterLink}
              to={`/tasks/${task.id}`}
              sx={{
                alignItems: "flex-start",
                px: 3,
                py: 2.25,
                borderLeft: "4px solid",
                borderLeftColor: "transparent",
                transition: "all 150ms ease",
                "&:hover": {
                  backgroundColor: "rgba(143, 91, 47, 0.08)",
                  borderLeftColor: "primary.main",
                },
              }}
            >
              <Stack spacing={1.25} sx={{ width: "100%" }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 0.75,
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    {task.description}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
                  <Chip
                    size="small"
                    color={difficultyColorMap[task.difficulty]}
                    label={task.difficulty}
                  />
                  {task.tags.map((tag) => (
                    <Chip key={tag} size="small" variant="outlined" label={tag} />
                  ))}
                </Stack>
              </Stack>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
