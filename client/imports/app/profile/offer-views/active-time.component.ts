import { Component } from "@angular/core";
import { ActiveDay, OfferWorkTime } from "../../../../../both/models/active-time";
import { Weekday } from "../../../../../both/models/weekday";

@Component({
  selector: "active-time",
  template: `
    active time
    <form materialize>
      <div class="row">
        <input id="dateFrom"
               class="col m2 l2"
               placeholder="date from"
               materialize="pickadate"
               [materializeParams]="[{selectMonths: true, selectYears: 15}]"
               type="text" />
        <input id="dateFrom"
               class="col m2 l2 offset-l1 offset-m1"
               placeholder="date to"
               materialize="pickadate"
               [materializeParams]="[{selectMonths: true, selectYears: 15}]"
               type="text" />
      </div>
      <div class="row">
        <div class="col m2 l2">
          <div>
            <input type="checkbox"
                   [attr.id]="'cb_alldays'"
                   [checked]="activeTime.weekdays.length === 7"
                   (change)="selectAllDays($event.target.checked)">
            <label [attr.for]="'cb_alldays'">All days</label>
          </div>

          <div>
            <input type="checkbox"
                   [attr.id]="'cb_workdays'"
                   [checked]="isAllWorkDaysSelected()"
                   (change)="selectWorkdays($event.target.checked)">
            <label [attr.for]="'cb_workdays'">Work-days</label>
          </div>

          <div>
            <input type="checkbox"
                   [attr.id]="'cb_time'"
                   [checked]="isTimeSame()"
                   (change)="setDefaultTime($event.target.checked)">
            <label [attr.for]="'cb_time'">Default time</label>
          </div>

          <time-picker [date]="defaultTimeFrom"></time-picker>
          —
          <time-picker [date]="defaultTimeTo"></time-picker>

        </div>
        <div class="col m5 l5 offset-m1 offset-l1">
          <div class="row valign-wrapper" *ngFor="let day of Weekday.values">
            <div class="col m3 l3">
              <input type="checkbox"
                     [attr.id]="'cb_' + day"
                     (change)="selectWeekday(day, $event.target.checked)"
                     [checked]="isDaySelected(day)">
              <label [attr.for]="'cb_' + day">{{day}}</label>
            </div>
            <time-picker *ngIf="isDaySelected(day)" [date]="defaultTimeFrom"></time-picker>
            —
            <time-picker *ngIf="isDaySelected(day)" [date]="defaultTimeTo"></time-picker>
          </div>
        </div>
      </div>
    </form>
  `
})
export class ActiveTimeComponent {
  private Weekday = Weekday;
  private activeTime: OfferWorkTime;

  private defaultTimeFrom: Date;
  private defaultTimeTo: Date;

  constructor() {
    this.activeTime = OfferWorkTime.init();
    this.setupDefaultTime();
  }

  setupDefaultTime() {
    this.defaultTimeFrom = new Date();
    this.defaultTimeTo = new Date();
    this.defaultTimeFrom.setHours(12);
    this.defaultTimeFrom.setMinutes(0);
    this.defaultTimeTo.setHours(17);
    this.defaultTimeTo.setMinutes(0);
  }

  setDefaultTime() {
    // TODO: implement me -- set default time
    console.log("TODO set default time for all selected days");
  }

  selectWorkdays() {
    // TODO: implement me -- should select all work days
    console.log("TODO select work days");
  }

  selectAllDays(isSelected: boolean) {
    if (isSelected) {
      Weekday.values.map(dayName => {
        if (!this.activeTime.weekdays.find(d => d.dayName === dayName)) {
          this.activeTime.weekdays.push({
            dayName,
            timeFrom: new Date(),
            timeTo: new Date()
          });
        }
      });
    }
  }

  isTimeSame() {
    // TODO: implement me -- should check
    // default time if all selected days have the same time
    console.log("TODO if time is same");
  }

  isAllWorkDaysSelected(): boolean {
    let countOfSelectedWorkDays = this.activeTime.weekdays
        .reduce((acc: number, next) => acc + (Weekday.workdays.indexOf(next.dayName) >= 0 ? 1 : 0), 0);
    return (countOfSelectedWorkDays === Weekday.workdaysCount) &&
           (countOfSelectedWorkDays === this.activeTime.weekdays.length);
  }

  isDaySelected(day: Weekday): boolean {
    return !!this.activeTime.weekdays.find(d => d.dayName === day);
  }

  private selectWeekday(dayName: Weekday, isSelected) {

    let timeFrom = new Date();
    let timeTo = new Date();
    if (isSelected) {
      this.activeTime.weekdays.push({dayName, timeFrom, timeTo});
    } else {
      this.activeTime.weekdays = this.activeTime.weekdays.filter(wd => wd.dayName !== dayName);
    }
  }

}
