import { useState } from "react";
import { AuthDialog, FormInput } from "../../components";
import styles from "./styles/login.module.scss";
import {
  Typography,
  Button,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUiDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import { fetchapi } from "../../services/apis/fetchAPI";
import { AppDispatch} from "../../redux/store";
import { login } from "../../redux/slices/authSlice";

function Login(): JSX.Element {
  const dispatch:AppDispatch = useUiDispatch();
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);

  const loginSchema = yup.object({
    username: yup.string(),
    password: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await fetchapi({
        method: "POST",
        url: "auth/login",
        body: values,
      });

      if (res.error) {
        return setApiErrorMsg(res.error);
      }

      dispatch(login({username: res.username, id: res.id}))
    },
  });

  const navigate = useNavigate();
  return (
    <AuthDialog title="Login">
      {apiErrorMsg && (
        <Alert severity="error" color="error">
          {apiErrorMsg}
        </Alert>
      )}
      <Box
        component="form"
        className={styles.box}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        {/** username */}
        <FormInput
          name="username"
          label="Username"
          type="text"
          formik={formik}
        />
        {/** password */}

        <FormInput
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />

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
                type="submit"
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
      </Box>
    </AuthDialog>
  );
}

export default Login;
