import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Centre } from "../util/Centre";
import { HeaderText } from "./HeaderText";

export const Landing = () => {
  const history = useHistory();

  return (
    <Centre>
      <HeaderText />
      <div className="pb-48 w-full">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => history.push("/login")}
        >
          Get Started
        </Button>
      </div>
    </Centre>
  );
};
