import { Typography } from "@material-ui/core";
import React from "react";

export const HeaderText: React.FC = () => {
  return (
    <div className="pb-12">
      <Typography variant="h2">
        <p>
          <strong>Write Something.</strong>
        </p>
        <p>
          <strong>Everyday.</strong>
        </p>
      </Typography>
    </div>
  );
};
