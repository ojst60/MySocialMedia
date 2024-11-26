import { useState } from "react";
import { AuthDialog, FormInput } from "../../components";
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
import { fetchApi } from "../../services/apis/fetchAPI";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";

function Login(): JSX.Element {
  const dispatch: AppDispatch = useUiDispatch();
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);



  function handleLogin  () {
    window.location.href = 'http://localhost:5000/api/v1/auth/login/google';
  };


  const loginSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await fetchApi({
        method: "POST",
        url: "auth/login",
        body: values,
      });

      if (res.error) {
        return setApiErrorMsg(res.error);
      }

      dispatch(login({ username: res.username, id: res.id }));
    },
  });

  const navigate = useNavigate();
  return (
    <AuthDialog title="Login">
      {apiErrorMsg && (
        <Alert severity="error" color="error" sx={{ marginBottom: 2 }}>
          {apiErrorMsg}
        </Alert>
      )}
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {/* Username Field */}
        <FormInput
          name="username"
          label="Username"
          type="text"
          formik={formik}
        />

        {/* Password Field */}
        <FormInput
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />

        {/* Remember Me & Sign-In Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </Box>

        {/* Navigation to Signup */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: 2,
            color: "text.secondary",
          }}
        >
          Don&apos;t have an account?{" "}
          <Button
            onClick={() => navigate("/register")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            Sign up
          </Button>
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Social Login Buttons */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogin}
          sx={{
            textTransform: "none",
            marginBottom: 1,
            fontWeight: 500,
            borderRadius: 2,
          }}
        >
          Sign in with Google
        </Button>
     
      </Box>
    </AuthDialog>
  );
}

export default Login;
