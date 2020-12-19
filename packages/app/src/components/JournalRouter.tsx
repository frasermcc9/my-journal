import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import UnixTimeRoundToDay from "../util/TimeConverter/TimeConverterStrategy";
import App from "./App";
import AuthProviderImpl from "./auth/AuthProvider";
import { Login } from "./auth/Login";
import Register from "./auth/Register";
import { Landing } from "./landing/Landing";

interface JournalRouterProps {
  currentUser?: number | null;
}

export const JournalRouter: React.FC<JournalRouterProps> = ({ currentUser }) => {
  useEffect(() => {
    AuthProviderImpl.get().trySessionLogin();
  }, []);

  if (currentUser === null) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-center">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (currentUser !== 0) {
    return (
      <Router>
        <AuthenticatedUserRoutes />
      </Router>
    );
  }

  return (
    <Router>
      <UnauthenticatedUserRoutes />
    </Router>
  );
};

const UnauthenticatedUserRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" render={() => <Login />} exact={true} />
      <Route path="/register" render={() => <Register />} exact={true} />
      <Route path="/" render={() => <Landing />}></Route>
    </Switch>
  );
};

const AuthenticatedUserRoutes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/app"
        render={() => <App timeConversionStrategy={new UnixTimeRoundToDay()} />}
        exact={true}
      />
      <Route path="/" render={() => <Redirect to={"/app"} exact={true} />} />
    </Switch>
  );
};
