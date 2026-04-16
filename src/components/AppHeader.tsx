import { AppBar, Box, Container, Toolbar, Button } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { ThemeModeToggle } from "./ThemeModeToggle";

export function AppHeader() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button component={RouterLink} to="/" color="inherit">
            Task list
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeModeToggle />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
