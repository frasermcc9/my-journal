import React from "react";
import { TextField } from "@material-ui/core";

interface EmailValidationFieldProps {
  onChangeHandler: (value: string) => void;
  value: string;
}

export const EmailValidationField: React.FC<EmailValidationFieldProps> = ({
  onChangeHandler,
  value,
}) => {
  return (
    <TextField
      label="Email"
      variant="outlined"
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      fullWidth
    />
  );
};
