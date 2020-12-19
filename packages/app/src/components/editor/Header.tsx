import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles, IconButton, Typography, Button } from "@material-ui/core";
import addDays from "date-fns/addDays";

const useStyles = makeStyles({
  largeIcon: {
    width: 60,
    height: 60,
  },
});

interface HeaderProps {
  calendarHandler: () => void;
  date: Date;
  setActiveDay: (date: Date) => void;
  preDateHook: () => boolean;
}

export const Header: React.FC<HeaderProps> = ({
  calendarHandler,
  date,
  setActiveDay,
  preDateHook,
}) => {
  const styles = useStyles();

  const incrementDate = (by: number) => setActiveDay(addDays(date, by));

  const buttonHandler = (changeBy: number) => {
    const hook = preDateHook();
    if (hook) {
      incrementDate(changeBy);
    }
  };

  return (
    <div className="h-32 bg-white flex justify-between items-center flex-row ">
      <IconButton onClick={() => buttonHandler(-1)}>
        <ArrowBackIosIcon className={styles.largeIcon} />
      </IconButton>

      <Button onClick={() => calendarHandler()}>
        <Typography variant="overline" style={{ fontSize: "1.175rem" }}>
          {date.toDateString()}
        </Typography>
      </Button>

      <IconButton onClick={() => buttonHandler(+1)}>
        <ArrowForwardIosIcon className={styles.largeIcon} />
      </IconButton>
    </div>
  );
};
