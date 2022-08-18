import { Injectable } from "@angular/core";

export enum SnotifyType {
    success = 'success',
    danger = 'danger',
    async = 'async'
}

export interface ISnotifyEvent {
    type: SnotifyType
    message: string
}

export interface IAsyncSnotyConfig {
    successMessage?: string
    errorMessage?: string
}

interface IInnerSnotifyEvent extends ISnotifyEvent {
    icon: string
    id: number
}

@Injectable({providedIn: 'root'})
export class SnotifyService {
    public cards: IInnerSnotifyEvent[] = [ ]
    private lastId: number = 1

    constructor( ) { }


    private addAsyncEvent(): IInnerSnotifyEvent {
        const event: IInnerSnotifyEvent = {
            icon: this.getIconByEventType(SnotifyType.async),
            type: SnotifyType.async,
            message: 'Várakozás...',
            id: this.lastId
        }
        this.lastId += 1
        this.cards.push(event)
        return event
    }

    private getIconByEventType(type: SnotifyType): string {
        switch (type) {
            case SnotifyType.async: return 'bi bi-arrow-clockwise'
            case SnotifyType.success: return 'bi bi-check-circle'
            case SnotifyType.danger: return 'bi bi-x-octagon'
        
            default: return 'bi bi-exclamation'
        }
    }

    public deleteSnoty(event: IInnerSnotifyEvent): void {
        this.cards = this.cards.filter(card => event.id != card.id)
    }

    public async<T = any>(promise: Promise<T>, config: IAsyncSnotyConfig = { }): Promise<T> {
        const event = this.addAsyncEvent()
        return new Promise((resolve, reject) => {
            promise
                .then(response => {
                    event.icon = this.getIconByEventType(SnotifyType.success)
                    event.message = config?.successMessage ?? 'Siker!'
                    event.type = SnotifyType.success
                    resolve(response)
                })
                .catch(error => {
                    event.icon = this.getIconByEventType(SnotifyType.danger)
                    event.message = config?.errorMessage ?? (error.message ?? 'Hiba!')
                    event.type = SnotifyType.danger
                    reject(error)
                })
                .finally(() => setTimeout(() => this.deleteSnoty(event), 3500))
        })
    }

    public addEvent(event: ISnotifyEvent): void {
        const innerEvent: IInnerSnotifyEvent = {
            ...event,
            icon: this.getIconByEventType(event.type),
            id: this.lastId
        }
        this.lastId += 0
        this.cards.push(innerEvent)
    }
}
