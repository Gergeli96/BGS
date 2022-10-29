import { NotificationType } from "../types/notification-types"
import { addNotification } from "./notification-helper"
import { Notification } from './notification-helper'
import { DeleteModal } from "../Modals/DeleteModal"
import { openModal } from "../Modals/modal.service"

export interface IHttpOptions {
    showNotification?: boolean
    deleteModalMessage?: string
}

export function Get<T = any>(url: string): Promise<T> {
    return makeRequest(fetch(getUrl(url)), false)
}

export function Post<T = any>(url: string, data: any): Promise<T> {
    // Default options are marked with *
    const isFormData = data instanceof FormData
    const headers: any = { }
    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }

    return makeRequest(fetch(getUrl(url), {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: isFormData ? data : JSON.stringify(data) // body data type must match "Content-Type" header
    }), true)
}

export function Put<T = any>(url: string, data: any): Promise<T> {
    const isFormData = data instanceof FormData
    const headers: any = { }
    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }

    return makeRequest(fetch(getUrl(url), {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: isFormData ? data : JSON.stringify(data) // body data type must match "Content-Type" header
    }), true)
}

export function Delete<T = any>(url: string, data: any = { }, options?: IHttpOptions): Promise<T> {
    return new Promise((resolve, reject) => {
        openModal(() => DeleteModal({message: options?.deleteModalMessage, deleteAction: () => {
            return new Promise((actionResolve, actionReject) => {
                deleteAction(url, data)
                    .then(response => {actionResolve(null), resolve(response)})
                    .catch(error => {actionReject(null), reject(error)})
            })  
        }}))
    })
}

function deleteAction(url: string, data: any): Promise<any> {
    const isFormData = data instanceof FormData
    const headers: any = { }
    if (!isFormData) {
        headers['Content-Type'] = 'application/json'
    }

    return makeRequest(fetch(getUrl(url), {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: headers,
        // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: isFormData ? data : JSON.stringify(data) // body data type must match "Content-Type" header
    }), true)
}

function getUrl(url: string): string {
    return `http://localhost:3000/api/${url}`
}

function makeRequest<T>(callback: Promise<Response>, showNotification: boolean): Promise<T> {
    let notification: Notification

    return new Promise((resolve, reject) => {
        if (showNotification) notification = addNotification({text: 'Betöltés', type: NotificationType.async})

        callback
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error(response.statusText)
                }
            })
            .then((data: T) => {
                notification?.deleteAsync(true)
                resolve(data)
            })
            .catch(error => {
                notification?.deleteAsync(false)
                reject(error)
            })
    })
}
