import React from "react";
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
} from "@mui/material";

import type { CreateUserInterface } from "../types";
import { useCreateUser } from "../hooks/useNewUsers";

interface props {
  isDialogOpen: boolean;
  onParentRelod: () => Promise<void>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateUser = ({ 
  isDialogOpen,
  onParentRelod,
  setIsDialogOpen,
}: props): React.JSX.Element => {

  const { createUser, error } = useCreateUser()
  const [form, setForm] = React.useState<CreateUserInterface>({
    email: "",
    full_name: "",
    password: ""
  });
  
  const handleCreateUser = async () => {
    await createUser(form);
    if (!error) {
      await onParentRelod();
      setForm({
        email: "",
        full_name: "",
        password: ""
      });
      setIsDialogOpen(false);
    }
  };

  return <Dialog 
    open={isDialogOpen} 
    onClose={() => setIsDialogOpen(false)} 
    fullWidth
  >
    <DialogTitle>Create new user</DialogTitle>
    <DialogContent>
      <Box display="flex" flexDirection="column" gap={2} pt={1}>
        <TextField
          label="Name"
          name="full_name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          fullWidth
        />
      </Box>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => setIsDialogOpen(false)}>
        Cancelar
      </Button>
      <Button variant="contained" onClick={handleCreateUser}>
        Crear
      </Button>
    </DialogActions>
  </Dialog>
}
