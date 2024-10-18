import Logo from "../../assets/images/logo.jpeg";
import styles from "./styles/landing.module.scss";
import { Box, Button, Typography } from "@mui/material";
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
    <div className={styles["root-container"]}>
      <div className={styles["logo-container"]}>
        <img src={Logo} className={styles.logo} alt="background"/>
      </div>
      <div className={styles["main-container"]}>
        <Box component="div" className={styles.content}>
          <Typography variant="h2">Join the gist</Typography>
          <Typography variant="h4">Join today</Typography>

          <Button onClick={onSignUpHandler}>Create an account</Button>

          <p>Already have an account ?</p>
          <Button onClick={onLoginHandler}>Login</Button>
        </Box>
      </div>
      <Outlet />
    </div>
  );
}

export default Landing;
