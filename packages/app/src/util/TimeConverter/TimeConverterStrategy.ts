import { getUnixTime } from "date-fns";

export interface TimeConverterStrategy {
  convertTime(from: Date | number): number;
}

export class UnixTimeRoundToDay implements TimeConverterStrategy {
  convertTime(from: number | Date): number {
    const d = new Date(from);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return getUnixTime(d);
  }
}

export default UnixTimeRoundToDay