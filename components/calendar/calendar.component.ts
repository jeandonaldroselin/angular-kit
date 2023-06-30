import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarViewPeriod, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { AppCalendarEventMeta } from './models/calendar.model';

const colors: {[key: string]:{ primary: string, secondary: string }} = {
  blue: {
    primary: '#5c77ff',
    secondary: '#FFFFFF'
  },
  yellow: {
    primary: '#ffc107',
    secondary: '#FDF1BA'
  },
  red: {
    primary: '#f44336',
    secondary: '#FFFFFF'
  }
};

@Component({
  selector: 'vex-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

  @Input() monthWord: string = 'Month';

  @Input() weekWord: string = 'Week';

  @Input() dayWord: string = 'Day';

  @Input() weekStartsOn: number = 2;

  @Input() locale: string = 'en';

  @Input() events: CalendarEvent<AppCalendarEventMeta>[] = [];

  @Input() handleEvent: (action: string, event: CalendarEvent) => void

  @Input() eventTimesChanged: ({ event, newStart, newEnd }: CalendarEventTimesChangedEvent) => void;

  @Output() beforeViewRender: EventEmitter<{ period: CalendarViewPeriod }> = new EventEmitter<{ period: CalendarViewPeriod }>();

  @Output() hasLaunchedChangePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  activeDayIsOpen = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0);
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onHasLaunchedChangePage() {
    this.hasLaunchedChangePage.emit(true);
  }

  onBeforeViewRender(
    event: { period: CalendarViewPeriod }): void {
    this.beforeViewRender.emit(event);
  }
}
