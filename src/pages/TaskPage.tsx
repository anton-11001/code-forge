import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router";
import { tasks } from "../tasks";

function TaskPage() {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return <Navigate to="/" replace />;
  }

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

              <Paper
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Next implementation step
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This task page is now separate from the task list. Next we can
                  add the Monaco editor and result panels directly on this page.
                </Typography>
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default TaskPage;
