import React from "react";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import "./Calender.css";
import { Button } from "@material-ui/core";
import Actions from "../util/Actions";

interface CalendarProps {
  onDayChosen: (day: Date) => void;
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ onDayChosen, date }) => {
  return (
    <>
      <div className="mx-auto" style={{ width: "80vh", height: "70vh" }}>
        <DatePickerCalendar date={date} onDateChange={(e) => onDayChosen(e!)} locale={enGB} />
      </div>
      <div className="flex justify-center items-center">
        <Button variant="outlined" color="primary" onClick={() => onDayChosen(new Date())}>
          Today
        </Button>
      </div>
    </>
  );
};

export default Calendar;
