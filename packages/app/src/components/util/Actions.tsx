import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import React from "react";

export interface ActionsProps {
  actions: { icon: any; name: string; action: () => void }[];
}

export const Actions: React.FC<ActionsProps> = ({ actions }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="absolute right-16 bottom-16">
      <SpeedDial
        ariaLabel="Actions"
        hidden={false}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              action.action();
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default Actions;
