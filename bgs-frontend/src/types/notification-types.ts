export enum NotificationType {
    success = 'success',
    warning = 'warning',
    danger = 'danger',
    async = 'async',
    info = 'info'
}

export interface INotification {
    type: NotificationType
    text: string
}
