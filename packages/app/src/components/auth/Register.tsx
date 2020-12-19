import { CardContent, Typography, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardCentre from "../util/CardCentre";
import AuthProviderImpl from "./AuthProvider";
import { EmailValidationField } from "./EmailValidationField";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("⠀");

  const history = useHistory();

  const creationHandler = async () => {
    const result = await AuthProviderImpl.get().tryRegister({
      email,
      password,
    });

    if (result) {
      return history.push("/login");
    }
    setError("Account creation failed. Most likely this email is already in use.");
  };

  const errorCheck = () => error !== "⠀";

  useEffect(() => {
    if (confirmPassword !== password) {
      return setError("Passwords do not match!");
    }
    if (password.length < 6) {
      return setError("Your password must be at least 6 characters.");
    }
    setError("⠀");
    return () => {
      return setError("⠀");
    };
  }, [password, confirmPassword, email]);

  return (
    <CardCentre>
      <CardContent className="mx-4">
        <div className="text-center p-4">
          <Typography variant="h5" className="p-2">
            Create an Account
          </Typography>
          <Typography variant="body1" className="p-2">
            For MyJournal
          </Typography>
        </div>
        <div className="py-4">
          <EmailValidationField onChangeHandler={setEmail} value={email} />
        </div>
        <div className="py-4">
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            fullWidth
          />
        </div>
        <div className="py-4">
          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            type="password"
            variant="outlined"
            autoComplete="current-password"
            fullWidth
            error={errorCheck()}
            helperText={error}
          />
        </div>
        <div className="flex flex-row justify-between pt-4 pb-2">
          <Button variant="text" color="primary" onClick={() => history.push("/")}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={creationHandler}
            disabled={errorCheck()}
          >
            Create Account
          </Button>
        </div>
      </CardContent>
    </CardCentre>
  );
};

export default Register;
