import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { AuthDialog } from "../../components/authDialog";
import styles from "./styles/signup.module.scss";

function Signup(): JSX.Element {
  const [usernameError, setUsernameError] = useState(false);
  function onCloseHandler() {
    {
      /** Add logic naviate home */
    }
  }
  return (
    <AuthDialog title="Sign up" onClose={onCloseHandler}>
      <Box component="form" className={styles.box} noValidate>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            name="username"
            id="username"
            type="text"
            placeholder="Please enter a username"
            color={usernameError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password1">Password</FormLabel>
          <TextField
            name="password1"
            id="password1"
            type="password"
            placeholder="Please enter a password"
            // color={usernameError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password2">Verify password</FormLabel>
          <TextField
            name="password2"
            id="password2"
            type="password"
            placeholder="Please enter a password"
            // color={usernameError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Verify password</FormLabel>
          <TextField
            name="email"
            id="email"
            type="email"
            placeholder="Please enter your email"
            // color={usernameError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
          <TextField
            name="dateOfBirth"
            id="dateOfBirth"
            type="date"
            placeholder="Please enter a password"
            // color={usernameError ? "error" : "primary"}
            autoFocus
            required
          />
        </FormControl>
      </Box>
    </AuthDialog>
  );
}

export default Signup;
