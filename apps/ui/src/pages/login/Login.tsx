import { useState } from "react";
import { AuthDialog } from "../../components/authDialog";
import styles from "./styles/login.module.scss";
import {
  Typography,
  Button,
  Divider,
  FormControl,
  Box,
  TextField,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  return (
    <AuthDialog title="Login">
      <Box component="form" className={styles.box} noValidate>
        {/** username */}
        <FormControl>
          <FormLabel htmlFor="username">Username </FormLabel>
          <TextField
            id="username"
            autoFocus
            type="text"
            name="username"
            color={usernameError ? "error" : "primary"}
            required
            placeholder="Please enter your username"
          />
        </FormControl>
        {/** password */}

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            placeholder="Please enter your password"
            color={passwordError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
      </Box>
      <Box className={styles["button-box"]}>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          // onClick={validateInputs}
        >
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Button
              onClick={() => navigate("/register")}
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Button>
          </span>
        </Typography>
        <Divider />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          // startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          // startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box>
    </AuthDialog>
  );
}

export default Login;
