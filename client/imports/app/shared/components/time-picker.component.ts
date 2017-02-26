import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";

declare var $: JQueryStatic;

@Component({
  selector: "time-picker",
  template: `<input type="text" class="input-time" [value]="getShortTimeString()" />`
})
export class TimePickerComponent implements AfterViewInit {

  @Input()
  private date: Date;

  getShortTimeString(): string {
    return /..:../.exec(this.date.toTimeString())[0];
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    $(this.el.nativeElement)["datetimepicker"]({
      datepicker: false,
      format: "H:i",
      defaultTime: "12:00 pm",
      minTime: "12:00 pm",
      maxTime: "17:01",
      step: 15,
      onSelectTime: (currentTime) => {
        this.date.setHours(currentTime.getHours());
        this.date.setMinutes(currentTime.getMinutes());
      }
    });
  }
}
