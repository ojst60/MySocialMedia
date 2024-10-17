import { FormControl, FormLabel, TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

// Reusable TextField component for form inputs
export const FormInput = ({
    name,
    label,
    type,
    formik,
  }: {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    formik: any;
  }) => (
    <FormControl fullWidth>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        {...formik.getFieldProps(name)}
        id={name}
        type={type}
        size="small"
        placeholder={`Please enter your ${label.toLowerCase()}`}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        required
        autoComplete={name} // Improve accessibility
      />
    </FormControl>
  );