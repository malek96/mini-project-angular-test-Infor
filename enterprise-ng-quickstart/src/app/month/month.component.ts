import {
  Component,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoBarComponent, SohoCalendarComponent, SohoToastService } from 'ids-enterprise-ng';


@Component({
  selector: 'app-month',
  templateUrl: 'month.component.html',
})
export class MonthComponent   {

  @HostBinding('style.overflow') overflow = 'auto';
  @HostBinding('style.height') height = 'auto';
  @HostBinding('style.display') block = 'block';

  @ViewChild(SohoCalendarComponent) sohoCalendarComponent?: SohoCalendarComponent;

  public initialMonth = 1;
  public initialYear = 2019;
  public showViewChanger = true;
  public eventTypes?: [];
  public events?: [];
  public iconTooltip = 'status';
  public eventTooltip = 'comments';
 

  public onCalendarDateSelectedCallback = (_node: Node, args: SohoCalendarDateSelectedEvent) => {
    console.log('onCalendarEventSelectedCallback', args);
  }

  constructor( private toastService: SohoToastService) { }

  onRenderMonth(event: SohoCalendarRenderMonthEvent) {
    console.log('onRenderMonth', event);
  }

  onSelected(event: SohoCalendarDateSelectedEvent) {
    console.log('onSelected', event);
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