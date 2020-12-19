import { Button, CardContent, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CardCentre from "../util/CardCentre";
import AuthProviderImpl from "./AuthProvider";
import { EmailValidationField } from "./EmailValidationField";



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  const loginHandler = async () => {
    const result = await AuthProviderImpl.get().tryLogin({
      email,
      password,
    });
    if (result) {
      return history.push("./app");
    } else {
      setIsError(true);
    }
  };


  return (
    <CardCentre>
      <CardContent className="mx-4">
        <div className="text-center p-4">
          <Typography variant="h5" className="p-2">
            Sign in
          </Typography>
          <Typography variant="body1" className="p-2">
            To continue to MyJournal
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
        <p className="text-center py-4 text-red-500">
          {isError ? "Could not find credentials for this account." : <br></br>}
        </p>
        <div className="flex flex-row justify-between pt-4 pb-2">
          <Button variant="text" color="primary" onClick={() => history.push("/register")}>
            Create Account
          </Button>
          <Button variant="contained" color="primary" onClick={loginHandler}>
            Login
          </Button>
        </div>
      </CardContent>
    </CardCentre>
  );
};
