
export interface ActiveTime {
  dateFrom: Date;
  dateTo: Date;
  weekdays: Weekday[];
}

export namespace ActiveTime {
  /*export function init(): ActiveTime {
    return {

    };
  }*/
}


export type WeekdayName =
  typeof WeekdayName.monday   |
  typeof WeekdayName.tuesday  |
  typeof WeekdayName.wednesday|
  typeof WeekdayName.thursday |
  typeof WeekdayName.friday   |
  typeof WeekdayName.saturday |
  typeof WeekdayName.sunday;

export namespace WeekdayName {
  export const monday    = "monday";
  export const tuesday   = "tuesday";
  export const wednesday = "wednesday";
  export const thursday  = "thursday";
  export const friday    = "friday";
  export const saturday  = "saturday";
  export const sunday    = "sunday";

  export const values: WeekdayName[] = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  ];

  export const workdays: WeekdayName[] = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday
  ];
}

export type Weekday = {
  [Day in WeekdayName] : {
    timeFrom: Date;
    timeTo: Date;
  }
}