import { formatDate } from '@angular/common';
import {
  Component,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoCalendarComponent, SohoToastService, SohoModalDialogService } from 'ids-enterprise-ng';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-month',
  templateUrl: 'month.component.html',
})
export class MonthComponent {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 4;
  public initialYear = 2022;
  public showViewChanger = true;

  public eventTypes?: any[] = [{
    id: "dayLegendType",
    label: "Day Legend",
    color: "turquoise",
    checked: true,
    disabled: false
  }];

  public events: any[] = [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
  public daysOfWeek = [
    { id: 1, label: "Monday", checked: true },
    { id: 2, label: "Tuesday", checked: true },
    { id: 3, label: "Wensday", checked: true },
    { id: 4, label: "Thursday", checked: true },
    { id: 5, label: "Friday", checked: true },
    { id: 6, label: "Saturday", checked: true },
    { id: 0, label: "Sunday", checked: true }
  ]
  public event = []
  weekEnd = { dayOfWeek: [0, 6] };
  public startDate: string = "";
  public endDate: string = "";
  public uncheckedDays: number[] = [];
  public submitted: boolean = false;


  public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }

  constructor(private toastService: SohoToastService, private modaleService: SohoModalDialogService) {
  }
  /**
   *  Get the correct type of date String to be used in SohoCalendarEvent
   * @param date date to get the string 
   * @returns string with specifique date format
   */
  getCorrectFormDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-ddThh:mm:ss', 'en_US');
  }
  /** Change events when end date changed */
  onDateChanged() {
    if (this.submitted) {
      this.onSaveEvent();
    }
  }
  /** change the events when days checked or unchecked */
  onCheckDay(id: number) {
    let index = this.uncheckedDays.indexOf(id);
    if (index >= 0) {
      this.uncheckedDays.splice(index, 1);
    } else {
      this.uncheckedDays.push(id);
    }
    if (this.submitted) {
      this.onSaveEvent();
    }

  }
  /** Create the events from start date to end date and with the days conndition */
  onSaveEvent() {
    if(this.startDate> this.endDate){
      this.toastService.show({ title: 'Error : ', message: ' Start date must be greater than en date' });
      return
    }
    let evnits: any[] = [];
    console.log(this.startDate, this.endDate);
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    let days = this.uncheckedDays;
    let calendarEven: SohoCalendarEvent = {
      status: "Pending",
      comments: "",
      type: "dayLegendType",
      starts: this.getCorrectFormDate(startDate),
      ends: this.getCorrectFormDate(startDate),
      color: "turquoise",
      subject: "",
      id: "startDate"
    };
    while (startDate <= new Date(this.endDate)) {
      if (days.includes(startDate.getDay())) {
        let end: Date = new Date(this.getCorrectFormDate(startDate));
        end.setDate(end.getDate() - 1);
        calendarEven.ends = this.getCorrectFormDate(end);
        while (days.includes(startDate.getDay())) {
          startDate.setDate(startDate.getDate() + 1);
        }
        evnits.push(Object.assign({}, calendarEven));
        calendarEven.starts = this.getCorrectFormDate(startDate);
        calendarEven.ends = this.getCorrectFormDate(startDate);
        calendarEven.id = this.getCorrectFormDate(startDate);
        console.log(evnits);
      } else {
        console.log(this.getCorrectFormDate(startDate));

        if ((this.getCorrectFormDate(startDate) === this.getCorrectFormDate(endDate))) {
          console.log("lastone", endDate, startDate);
          calendarEven.ends = this.getCorrectFormDate(startDate);
          calendarEven.id = this.getCorrectFormDate(startDate);
          evnits.push(Object.assign({}, calendarEven));
        }
        startDate.setDate(startDate.getDate() + 1);
      }
    }
    this.events = evnits;
    this.submitted = true;
    console.log(this.events);
  }

  /** Create event by day  */
  createEventByDay(date: Date) {
    let evn: any[] = [];
    let calendarEven: SohoCalendarEvent = {
      status: "Pending",
      comments: "",
      type: "dayLegendType",
      starts: this.getCorrectFormDate(date),
      ends: this.getCorrectFormDate(date),
      color: "azure",
      subject: "",
      id: this.getCorrectFormDate(date)
    };
    evn.push(calendarEven);
    let listAppend = this.events.concat(evn)
    this.events = listAppend;
    console.log(this.events);
  }
  /** display confrim modal to create event by day */
  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
    let dayDateString: string = event.key?.substring(0, 4) + "-" + event.key?.substring(4, 6) + "-" + event.key?.substring(6, 8)
    console.log(dayDateString)
    let dayDate: Date = new Date(dayDateString);
    let mod: SohoModalOptions = {
      title: "DayLegend ",
      buttons: [{
        text: 'Cancel',
        click: (e, modal) => {
          modal.close();
        }
      }, {
        text: 'Submit',
        click: (e, modal) => {
          this.createEventByDay(dayDate);
          modal.close();
        }
      }]
    }
    this.modaleService.modal(ConfirmModalComponent, undefined, mod).open();
  }

  onEventClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Clicked' });
    console.log('onEventClick', event);
  }

  onEventDblClicked(event: SohoCalendarEventClickEvent) {
    this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" Double Clicked' });
    console.log('onEventDblClick', event);
  }

  onCalendarEventContextMenu(event: SohoCalendarEventClickEvent) {
    if (event) {
      this.toastService.show({ title: 'Calendar Test', message: 'Event "' + event?.event?.subject + '" ContextMenu' });
      console.log('onEventContextMenu', event);

    }
  }
}