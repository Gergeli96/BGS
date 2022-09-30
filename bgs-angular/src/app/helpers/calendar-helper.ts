import { ICalendarEvent } from "../types/calendar-types"
import { Importance } from "../types/common-types"

export enum Months {
    januar = 1,
    februar = 2,
    marcius = 3,
    aprilis = 4,
    majus = 5,
    junius = 6,
    julius = 7,
    augusztus = 8,
    szeptember = 9,
    oktober = 10,
    november = 11,
    december = 12
}

export class CalendarEvent implements ICalendarEvent {
    private fullheight: number = 25 * 60
    public importance: Importance
    public date: string
    public text: string
    public from: string
    public id?: number
    public to: string
    public top: string
    public height: string

    constructor(event: ICalendarEvent) {
        this.importance = event.importance
        this.date = event.date
        this.text = event.text
        this.from = event.from
        this.id = event.id
        this.to = event.to
        this.calculatePositions()
    }

    private calculatePositions(): void {
        const [fromHour, fromMinute] = this.from.split(':').map(val => parseInt(val))
        const [toHour, toMinute] = this.to.split(':').map(val => parseInt(val))
        let fromPercentage = (fromHour * 60) + fromMinute
        this.top = `${(fromPercentage / this.fullheight) * 100}%`

        let toPercentage = (toHour * 60) + toMinute
        this.height = `${((toPercentage / this.fullheight) * 100) - ((fromPercentage / this.fullheight) * 100)}%`
    }
}

export class CalendarDay {
    public events: CalendarEvent[] = [ ]
    public year: number
    public month: number
    public day: number

    constructor(date: Date, day: number, public inSelectedMonth: boolean = true) {
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = day
    }

    public get dateString(): string {
        return `${this.year}-${this.extend(this.month)}-${this.extend(this.day)}`
    }

    private extend(date: number): string | number {
        return date < 10 ? `0${date}` : date
    }
}

export class CalendarHelper {

    public getMonth(month: Months, year: number = new Date().getFullYear()): CalendarDay[] {
        const previousDate = new Date(`${year}-${month}-1`)
        previousDate.setDate(previousDate.getDate() - 1)
        const date = new Date(`${year}-${month}-1`)
        
        const calendarDays: CalendarDay[] = new Array(7 - date.getDay()).fill(0)
            .map((_, index) => new CalendarDay(previousDate, previousDate.getDate() - index, false))
            .reverse()

        const nextDate = new Date(`${year}-${month + 1}-1`)
            nextDate.setDate(nextDate.getDate() - 1)

        new Array(nextDate.getDate()).fill(0)
            .forEach((_, index) => calendarDays.push(new CalendarDay(date, index + 1)))

        if (calendarDays.length < (5 * 7)) {
            const nextDate = new Date(`${year}-${month + 1}-1`)
            new Array((6 * 7) - calendarDays.length).fill(0)
                .forEach((_, index) => calendarDays.push(new CalendarDay(nextDate, index + 1, false)))
        }

        return calendarDays
    }

    public setEventsForCalendarDay(day: CalendarDay, events: Map<string, ICalendarEvent[]>): void {
        if (events.has(day.dateString)) {
            day.events = (events.get(day.dateString) as ICalendarEvent[])
                .map(e => new CalendarEvent(e))
        }
    }

    public eventListToEventMap(events: ICalendarEvent[]): Map<string, ICalendarEvent[]> {
        const eventsMap = new Map<string, ICalendarEvent[]>()

        events.forEach(event => {
            if (!eventsMap.has(event.date)) {
                eventsMap.set(event.date, [ ])
            }

            eventsMap.get(event.date)?.push(event)
        })

        return eventsMap
    }

    public toMonthEnum(month: number): Months {
        switch (month) {
            case 0: return Months.januar
            case 1: return Months.februar
            case 2: return Months.marcius
            case 3: return Months.aprilis
            case 4: return Months.majus
            case 5: return Months.junius
            case 6: return Months.julius
            case 7: return Months.augusztus
            case 8: return Months.szeptember
            case 9: return Months.oktober
            case 10: return Months.november
            case 11: return Months.december
        
            default: return Months.januar
        }
    }
}
