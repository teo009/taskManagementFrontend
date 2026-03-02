import React from "react";
import { Box, Button, TextField } from "@mui/material";

import { useCreateTask } from "../hooks/useNewTask";

interface props { onParentUpdate: () => Promise<void> };

export const CreateTask = ({ onParentUpdate }: props): React.JSX.Element => {

  const { createTask } = useCreateTask();
  const [newTask, setNewTask] = React.useState<string>("");

  const handleAddNewTask = async (task: string) => {
    await createTask(task);
    await onParentUpdate();
    setNewTask('');
  }

  return <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
    <TextField
      fullWidth
      label="New Task"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <Button 
      variant="contained" 
      disabled={newTask.length === 0 ? true : false}
      onClick={() => handleAddNewTask(newTask)}
    >
      Add
    </Button>
  </Box>
}
