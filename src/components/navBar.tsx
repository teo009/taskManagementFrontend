import type React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import type { UserRole } from "../types/user";
import { useLogout } from "../hooks/useLogout";

interface props {
  userRole: UserRole;
}

export const NavBar = ({ userRole }: props): React.JSX.Element => {

  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  }

  return <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6">Task Manager</Typography>
      <Box>
        {userRole === "admin" && (
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={() => navigate('/admin')}
          >
            Admin Panel
          </Button>
        )}
        <Button 
          color="warning" 
          variant="contained" 
          sx={{ marginLeft: 2 }}
          onClick={() => handleLogOut()}
        >
          Log out
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
}
