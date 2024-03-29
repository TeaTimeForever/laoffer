import { Component } from "@angular/core";
import { ActiveDay, OfferWorkTime } from "../../../../../both/models/active-time";
import { Weekday } from "../../../../../both/models/weekday";
import DaySet = Weekday.DaySet;

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
                   [checked]="isAllDaysSelected()"
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
          <div class="row valign-wrapper" *ngFor="let day of Weekday.alldays">
            <div class="col m3 l3">
              <input type="checkbox"
                     [attr.id]="'cb_' + day"
                     (change)="pickDay(day, $event.target.checked)"
                     [checked]="getDay(day)">
              <label [attr.for]="'cb_' + day">{{day}}</label>
            </div>
            <div *ngIf="getDay(day)">
              <time-picker [date]="getDay(day).timeFrom"></time-picker>
              —
              <time-picker [date]="getDay(day).timeTo"></time-picker>
            </div>
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

  private setupDefaultTime() {
    this.defaultTimeFrom = new Date();
    this.defaultTimeTo = new Date();
    this.defaultTimeFrom.setHours(13);
    this.defaultTimeFrom.setMinutes(0);
    this.defaultTimeTo.setHours(17);
    this.defaultTimeTo.setMinutes(0);

  }

  private setDefaultTime() {
    this.activeTime.weekdays.map(d => {
      d.timeFrom.setHours(this.defaultTimeFrom.getHours());
      d.timeFrom.setMinutes(this.defaultTimeFrom.getMinutes());
      d.timeTo.setHours(this.defaultTimeTo.getHours());
      d.timeTo.setMinutes(this.defaultTimeTo.getMinutes());
    });
  }

  private isTimeSame(): boolean {
    let differences = this.activeTime.weekdays
      .reduce((acc, next) => acc.add(next.timeFrom.toTimeString())
                                .add(next.timeTo.toTimeString()),
        new Set());
    console.log("diffs", differences);
    return differences.size === 2;
  }

  private selectWorkdays(isSelected: boolean) {
    if (isSelected) {
      this.selectDays(DaySet.workdays);
      this.deselectDays(DaySet.weekends);
    }
  }

  private selectAllDays(isSelected: boolean) {
    if (isSelected) {
      this.selectDays(DaySet.alldays);
    }
  }

  private selectDays(daytype: Weekday.DaySet) {
    Weekday[daytype].map(dayName => {
      let dayIsNotSelected = !this.activeTime.weekdays.find(d => d.dayName === dayName);
      if (dayIsNotSelected) {
        this.selectDay(dayName);
      }
    });
  }

  private deselectDays(daytype: Weekday.DaySet) {
    Weekday[daytype].map(dayName => {
      this.deselectDay(dayName);
    });
  }

  private isAllDaysSelected(): boolean {
    return this.activeTime.weekdays.length === Weekday.daysCount;
  }

  private isAllWorkDaysSelected(): boolean {
    let countOfSelectedWorkDays = this.activeTime.weekdays
        .reduce((acc: number, next) => acc + (Weekday.workdays.indexOf(next.dayName) >= 0 ? 1 : 0), 0);
    return (countOfSelectedWorkDays === Weekday.workdaysCount) &&
           (countOfSelectedWorkDays === this.activeTime.weekdays.length);
  }

  private getDay(day: Weekday): ActiveDay {
    return this.activeTime.weekdays.find(d => d.dayName === day);
  }

  private pickDay(dayName: Weekday, isSelected) {
    isSelected ? this.selectDay(dayName) : this.deselectDay(dayName);
  }

  private selectDay(dayName: Weekday) {
    let timeFrom = new Date(this.defaultTimeFrom);
    let timeTo   = new Date(this.defaultTimeTo);
    this.activeTime.weekdays.push({dayName, timeFrom, timeTo});
  }

  private deselectDay(dayName: Weekday) {
    this.activeTime.weekdays = this.activeTime.weekdays.filter(day => day.dayName !== dayName);
  }
}
