import { INotification, NotificationType } from "../types/notification-types";
import { Accessor, createSignal, Setter } from "solid-js";

export const [notifications, setNotifications] = createSignal<Notification[]>([])

export class Notification {
    public type: NotificationType
    public text: string
    public id: number

    constructor(id: number, config: INotification) {
        this.type = config.type
        this.text = config.text
        this.id = id

        if (this.type != NotificationType.async) {
            setTimeout(() => this.delete(), 3500)
        }
    }

    public delete(): void {
        setNotifications(notifications().filter(x => x.id != this.id))
    }

    public deleteAsync(success: boolean): void {
        let card = document.querySelector(`.notifications-container .notification-card[attr-id="${this.id}"]`)
        card?.setAttribute('attr-type', success ? NotificationType.success : NotificationType.danger)
        if (card?.querySelector('.message') != null) {
            (card.querySelector('.message') as HTMLElement).innerText = success ? 'Siker' : 'Hiba'
        }

        setTimeout(() => this.delete(), 3500)
    }
}

let id: number = 1;

export function addNotification(config: INotification): Notification {
    let x = new Notification(id, config)
    setNotifications([...notifications(), x])
    id += 1

    return x
}
