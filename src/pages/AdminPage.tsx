import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, DialogTitle } from "@mui/material";

import { CreateUser, UsersTable } from "../components";

import { useUsers } from "../hooks/useUsers";

export const AdminPage = (): React.JSX.Element => {

  const navigate = useNavigate();
  const { users, loading, refetch } = useUsers();
  const [isDoalogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <Box sx={{ width: "95vw", p: 4, position: 'absolute', top: 0 }} >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Admin - Usuarios</Typography>
        <Box>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Regresar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => setIsDialogOpen(true)}
            sx={{ marginLeft: 2 }}
          >
            Nuevo Usuario
          </Button>
        </Box>
      </Box>
      <Paper> 
        {
          loading 
            ? <DialogTitle>Loading users...</DialogTitle>
            : <UsersTable users={users} />
        }
      </Paper>
      <CreateUser 
        isDialogOpen={isDoalogOpen} 
        onParentRelod={refetch}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Box>
  );
};
