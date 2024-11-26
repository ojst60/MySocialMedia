import { Box, Button, Typography } from "@mui/material";
import { FormInput } from "../../components";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../services/apis/fetchAPI";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthDialog } from "../../components";
import { validationDict } from "../../validation/validationDict";
import { useNotifications } from "@toolpad/core";

// Define validation schema for form fields
const validationSchema = yup.object({
  username: validationDict.username,
  email: validationDict.email,
  password: validationDict.password,
});

function Signup(): JSX.Element {
  const navigate = useNavigate();
  const notification = useNotifications();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await fetchApi({
        method: "POST",
        url: "auth/register",
        body: values,
      });

      if (res.error) {
        notification.show(res.error, {
          severity: "error",
        });
      } else {
        notification.show("New account created successfully", {
          severity: "success",
        });
        navigate("/"); // Navigate to the homepage or desired route after successful registration
      }
    },
  });

  return (
    <AuthDialog title="Sign Up">
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormInput
          name="username"
          label="Username"
          type="text"
          formik={formik}
        />
        <FormInput name="email" label="Email" type="email" formik={formik} />
        <FormInput
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            padding: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            marginTop: 2,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Create Account
        </Button>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginTop: 2,
            color: "text.secondary",
          }}
        >
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              padding: 0,
              margin: 0,
              color: "primary.main",
            }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </AuthDialog>
  );
}

export default Signup;
