import { Importance } from "./common-types";

export interface ICalendarEvent {
    importance: Importance
    date: string
    text: string
    from: string
    id?: number
    to: string
}
