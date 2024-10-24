import {
  Grid2 as Grid,
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
import styles from "./styles/layoutRoute.module.scss";
import { useUiDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { fetchapi } from "../services/apis/fetchAPI";

type MenuItems = {
  label: string;
  icon: ReactNode;
  to: string;
};

const drawerWidth = 240;

function LayoutRoute(): JSX.Element {
  const dispatch = useUiDispatch();

  const menuItems: MenuItems[] = [
    { label: "Home", icon: <HomeOutlined />, to: "/dashboard" },
    { label: "Profile", icon: <AccountBoxOutlined />, to: "/profile" },
    { label: "Friends", icon: <GroupsOutlined />, to: "/friends" },
    { label: "Messages", icon: <MessageOutlined />, to: "/messages" },
  ];

  async function logoutHandler() {
    const res = await fetchapi({ method: "POST", url: "auth/logout" });

    if (!res.error) {
      dispatch(logout());
    }
  }

  return (
    <Grid container spacing={1}>
      {/* Sidebar */}
      <Grid size={{ xs: 12, md: 3, lg: 2 }}>
        <Box component="nav">
          <Drawer
            anchor="left"
            variant="permanent"
            elevation={0}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "none", md: "block" }, // Hidden on small screens
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                border: 'none',
                
              },
              border: '0px'
            }}
          >
            <Toolbar />
            <Divider />
            <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
              <List dense>
                {menuItems.map(({ icon, label, to }, index) => (
                  <NavLink to={to} key={index} className={styles["nav-link"]}>
                    {({ isActive }) => (
                      <ListItem
                        disablePadding
                        className={
                          isActive ? styles["active-menu"] : styles.menu
                        }
                      >
                        <ListItemButton>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText primary={label} />
                        </ListItemButton>
                      </ListItem>
                    )}
                  </NavLink>
                ))}
              </List>

              <Button onClick={logoutHandler}>Log out</Button>
            </Stack>
          </Drawer>
        </Box>
      </Grid>

      {/* Content area */}
      <Grid size={{ xs: 12, md: 9, lg: 10 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default LayoutRoute;
