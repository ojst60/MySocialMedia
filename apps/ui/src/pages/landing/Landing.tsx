import styles from "./styles/landing.module.scss";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

function Landing(): JSX.Element {
  const navigate = useNavigate();

  function onLoginHandler() {
    navigate("/login");
  }

  function onSignUpHandler() {
    navigate("/register");
  }

  return (
    <Grid2
      container
      spacing={1}
      className={styles["root-container"]}
      sx={{
        height: "100vh", // 100% of the viewport height
        width: "100vw", // 100% of the viewport width
      }}
    >
      <Grid2
        size={12}
        sx={(theme) => ({
          padding: theme.spacing(4),
          color: "#2a3141",
          textAlign: "center",
        })}
      >
        <Typography variant="h3">Weclome to the Gist</Typography>
      </Grid2>

      <Grid2 className={styles["main-container"]} size={12}>
        <Box component="div" className={styles.content}>
          <Button onClick={onSignUpHandler}>Create an account</Button>

          <Typography variant="body1" sx={{ color: "black" }}>
            Already have an account ?
          </Typography>
          <Button onClick={onLoginHandler}>Login</Button>
        </Box>
      </Grid2>
      <Outlet />
    </Grid2>
  );
}

export default Landing;
