import * as yup from "yup";

// A dictionary containing reusable validation schemas
export const validationDict = {
  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(15, "Username must be at most 15 characters")
    .required("Username is required"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special characters"
    )
    .required("Password is required"),
};

