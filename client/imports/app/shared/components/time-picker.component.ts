import { AfterViewInit, Component, ElementRef, EventEmitter, Output } from "@angular/core";

declare var $: JQueryStatic;

@Component({
  selector: "time-picker",
  template: `<input type="text" class="input-time" [value]="getFormattedDate()"  />`
})
export class TimePickerComponent implements AfterViewInit {
  @Output()
  timeSelected = new EventEmitter();

  private date: Date;

  getFormattedDate(): string {
    return /..:../.exec(this.date.toTimeString())[0];
  }

  constructor(private el: ElementRef) {
    this.date = new Date();
    this.date.setHours(12, 0);
  }

  ngAfterViewInit(): void {
    $(this.el.nativeElement).datetimepicker({
      datepicker: false,
      format: "H:i",
      defaultTime: "12:00 pm",
      minTime: "12:00 pm",
      maxTime: "17:01",
      step: 15,
      onSelectTime: (currentTime) => {
        this.date = currentTime;
        this.timeSelected.next(currentTime);
      }
    });
  }
}
