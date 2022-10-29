import { notifications } from "../helpers/notification-helper";
import { Notification } from '../helpers/notification-helper';
import { IJsxElement } from "../types/general-types";
import { For } from "solid-js";
import './Notifications.scss';

export function  Notifications(): IJsxElement {

    return (
        <div class="notifications-container d-flex column align-center">
            <For each={notifications()}>{x =>
                <NotificationCard notification={x} />
            }
            </For>
        </div>
    )
}

export interface INotificationCardProps {
    notification: Notification
}


export function NotificationCard(props: INotificationCardProps): IJsxElement {

    return (
        <div class="notification-card d-flex justify-between align-center mt-2 p-4" attr-type={props.notification.type} attr-id={props.notification.id}>
            <div class="d-flex align-center">
                <i class="type-icon bi pr-2"></i>
                <span class="message">{props.notification.text}</span>
            </div>
            
            <i class="bi bi-x cursor-pointer" onClick={() => props.notification.delete()}></i>
        </div>
    )
}
