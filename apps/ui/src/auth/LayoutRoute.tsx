import {
  Grid2,
  Drawer,
  Toolbar,
  Divider,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import {
  HomeOutlined,
  AccountBoxOutlined,
  GroupsOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import { ReactNode } from "react";
import { useUiDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { fetchApi } from "../services/apis/fetchAPI";
import styles from "./styles/layout.module.scss";

type MenuItems = {
  label: string;
  icon: ReactNode;
  to: string;
};

const drawerWidth = 280;

function LayoutRoute(): JSX.Element {
  const dispatch = useUiDispatch();

  const menuItems: MenuItems[] = [
    { label: "Home", icon: <HomeOutlined />, to: "/dashboard" },
    { label: "Profile", icon: <AccountBoxOutlined />, to: "/profile" },
    { label: "Friends", icon: <GroupsOutlined />, to: "/friends" },
    { label: "Messages", icon: <MessageOutlined />, to: "/messages" },
  ];

  async function logoutHandler() {
    const res = await fetchApi({ method: "POST", url: "auth/logout" });

    if (!res.error) {
      dispatch(logout());
    }
  }

  return (
    <Grid2 container spacing={0}>
      {/* Sidebar */}
      <Grid2
        spacing={{ xs: 12, md: 3, lg: 2 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "rgb(33, 41, 54)",
          color: "rgb(255, 255, 255)",
        }}
      >
        <Box component="nav">
          <Drawer
            anchor="left"
            variant="permanent"
            elevation={0}
            sx={{
              display: { xs: "none", md: "block" }, // Hidden on small screens
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                background: "linear-gradient(180deg, #222831, #393e46)",
                color: "rgb(255, 255, 255)",
              },
            }}
          >
            <Toolbar />
            <Divider sx={{ backgroundColor: "rgb(67, 81, 96)" }} />
            <Stack
              sx={{
                flexGrow: 1,
                p: 1,
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <List dense>
                {menuItems.map(({ icon, label, to }, index) => (
                  <NavLink
                    to={to}
                    key={index}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.isActive : ""}`
                    }
                  >
                    {({ isActive }) => (
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            borderRadius: "8px",
                            marginBottom: "10px",
                            "&:hover": {
                              backgroundColor: "rgb(50, 70, 90)",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: isActive
                                ? "#FFD369"
                                : "rgb(173, 185, 202)",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={label}
                            primaryTypographyProps={{
                              color: isActive
                                ? "#FFD369"
                                : "rgb(173, 185, 202)",
                              fontWeight: isActive ? "bold" : "normal",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    )}
                  </NavLink>
                ))}
              </List>

              <Button
                sx={{
                  background: "linear-gradient(45deg, #FF416C, #FF4B2B)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF4B2B, #FF416C)",
                  },
                }}
                onClick={logoutHandler}
              >
                Log out
              </Button>
            </Stack>
          </Drawer>
        </Box>
      </Grid2>

      {/* Content area */}
      <Grid2
        spacing={{ xs: 12, md: 12, lg: 10 }}
        sx={{
          background: "rgb(248, 249, 250)",
          minHeight: "100vh",
          padding: 3,
          width: "100%"
        }}
      >
        <Outlet />
      </Grid2>
    </Grid2>
  );
}

export default LayoutRoute;
