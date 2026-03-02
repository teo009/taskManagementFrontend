import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../context/AuthContext";
import { CreateTask, NavBar, TaskManagement } from "../components";

export const HomePage = (): React.JSX.Element => {

  const { user } = useAuth();
  const { tasks, loading, refetch } = useTasks();

  React.useEffect(() => {
    //fetchTasks();
  }, []);

  return (
    <Box sx={{ width: "100vw" }}>
      { user && <NavBar userRole={user.role} /> }
      <Container maxWidth="sm" sx={{ marginTop: 10 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            My Tasks
          </Typography>
          { <CreateTask onParentUpdate={refetch} /> }
          {
            loading 
              ? (<Typography>Loading...</Typography>) 
              : (<TaskManagement tasks={tasks} onParentUpdate={refetch} />)
          }
        </Paper>
      </Container>
    </Box>
  );
};
