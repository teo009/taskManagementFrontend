import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import type { TaskInterface, TaskStatus } from "../types";
import { useUpdateTaskStatus } from "../hooks/useUpdateTask";

interface Props {
  tasks: TaskInterface[];
  onParentUpdate: () => Promise<void>;
}

export const TaskManagement = ({ tasks, onParentUpdate}: Props): React.JSX.Element => {

  const { updateStatus } = useUpdateTaskStatus();
  const [filter, setFilter] = React.useState<"all" | TaskStatus>("all");

  const filteredTasks = React.useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const handleUpdateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
    await updateStatus(taskId, newStatus);
    await onParentUpdate();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Filter tasks</InputLabel>
        <Select
          value={filter}
          label="Filter tasks"
          onChange={(e) => setFilter(e.target.value as "all" | TaskStatus)}
        >
          <MenuItem value="all">-- All --</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>

      {/* Task List */}
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.status === "completed"}
              onChange={() =>
                handleUpdateTaskStatus(
                  task.id,
                  task.status === "completed" ? "pending" : "completed",
                )
              }
            />
            <ListItemText
              primary={task.name}
              sx={{
                textDecoration:
                  task.status === "completed" ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
