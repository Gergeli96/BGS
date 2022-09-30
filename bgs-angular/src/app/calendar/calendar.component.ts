import { CalendarDay, CalendarHelper } from '../helpers/calendar-helper';
import { Importance } from '../types/common-types';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    public dayNames = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
    public hours = new Array(24).fill(0).map((_, index) => index + 1)
    private calendarHelper = new CalendarHelper()
    public calendarDays: CalendarDay[] = [ ]
    public days: CalendarDay[] = [ ]

    constructor() {
        this.calendarDays = this.calendarHelper.getMonth(this.calendarHelper.toMonthEnum(new Date().getMonth()))

        let events = this.calendarHelper.eventListToEventMap([
            {date: '2022-08-01', importance: Importance.info,text: 'info', from: '12:30', to: '14:00'},
            {date: '2022-08-02', importance: Importance.low,text: 'low', from: '10:30', to: '11:00'},
            {date: '2022-08-02', importance: Importance.middle,text: 'middle', from: '12:30', to: '14:00'},
            {date: '2022-08-03', importance: Importance.high,text: 'high', from: '12:30', to: '17   :00'},
            {date: '2022-08-05', importance: Importance.ultra,text: 'ultra', from: '12:30', to: '14:00'},
        ])
        this.calendarDays.forEach(day => {
            this.calendarHelper.setEventsForCalendarDay(day, events)
        })

        this.days = this.calendarDays.slice(0, 7)
    }

    ngOnInit(): void { }

}
