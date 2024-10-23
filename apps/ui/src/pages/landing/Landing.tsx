import Logo from "../../assets/images/logo.jpeg";
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
      <Grid2 className={styles["logo-container"]}>
        <img src={Logo} className={styles.logo} alt="background" />
      </Grid2>
      <Grid2 className={styles["main-container"]}>
        <Box component="div" className={styles.content}>
          <Typography variant="h2">Join the gist</Typography>
          <Typography variant="h4">Join today</Typography>

          <Button onClick={onSignUpHandler}>Create an account</Button>

          <p>Already have an account ?</p>
          <Button onClick={onLoginHandler}>Login</Button>
        </Box>
      </Grid2>
      <Outlet />
    </Grid2>
  );
}

export default Landing;
