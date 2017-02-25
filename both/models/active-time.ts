import { Weekday } from "./weekday";

export interface OfferWorkTime {
  dateFrom: Date;
  dateTo: Date;
  weekdays: ActiveDay[];
}

export namespace OfferWorkTime {
  export function init(): OfferWorkTime {
    let dateAfterWeek = new Date;
    dateAfterWeek.setDate(dateAfterWeek.getDate() + 7);
    return {
      dateFrom: new Date(),
      dateTo: dateAfterWeek,
      weekdays: []
    };
  }
}

export type ActiveDay = {
  dayName: Weekday
  timeFrom: Date;
  timeTo: Date;
}