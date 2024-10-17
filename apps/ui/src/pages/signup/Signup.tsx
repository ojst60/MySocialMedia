import {
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { AuthDialog, FormInput } from "../../components";
import styles from "./styles/signup.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchapi } from "../../services/apis/fetchAPI";
import { useFormik } from "formik";
import * as yup from "yup";
import { validationDict } from "../../validation/validationDict";
// Define validation schema for form fields
const validationSchema = yup.object({
  username:validationDict.username,
  email: validationDict.email,
  password: validationDict.password
});

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await fetchapi({
        method: "POST",
        url: "auth/register",
        body: values,
      });

      if (res.error) {
        setApiErrorMsg(res.error);
      } else {
        navigate("/");
      }
    },
  });

  return (
    <AuthDialog title="Sign Up">
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
        <FormInput
          name="username"
          label="Username"
          type="text"
          formik={formik}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />
        <FormInput name="email" label="Email" type="email" formik={formik} />

        <Box className={styles["button-box"]}>
          <Button type="submit" fullWidth variant="contained">
            Create Account
          </Button>
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{ alignSelf: "center" }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </AuthDialog>
  );
}

export default Signup;
