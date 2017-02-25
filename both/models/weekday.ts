export type Weekday =
  typeof Weekday.monday   |
  typeof Weekday.tuesday  |
  typeof Weekday.wednesday|
  typeof Weekday.thursday |
  typeof Weekday.friday   |
  typeof Weekday.saturday |
  typeof Weekday.sunday;

export namespace Weekday {
  export const monday    = "monday";
  export const tuesday   = "tuesday";
  export const wednesday = "wednesday";
  export const thursday  = "thursday";
  export const friday    = "friday";
  export const saturday  = "saturday";
  export const sunday    = "sunday";

  export const values: Weekday[] = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  ];

  export const workdaysCount = 5;

  export const weekends: Weekday[] = [
    saturday,
    sunday
  ];

  export const workdays: Weekday[] = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday
  ];
}