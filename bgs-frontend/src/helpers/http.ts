import { NotificationType } from "../types/notification-types"
import { addNotification } from "./notification-helper"
import { TOKEN } from "../Authentication/AuthProvider"
import { Notification } from './notification-helper'
import { DeleteModal } from "../Modals/DeleteModal"
import { openModal } from "../Modals/modal.service"

export interface IHttpOptions {
    showNotification?: boolean
    deleteModalMessage?: string
}

interface IInnerHttpOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    mode?: 'cors'
    cache?: 'no-cache'
    credentials?: 'same-origin'
    headers?: {[key: string]: string}
    'Content-Type'?: 'application/x-www-form-urlencoded' | 'application/json'
    redirect?: 'manual' | 'follow' | 'error'
    referrerPolicy?: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: any
}

function getHttpOptions(options: IInnerHttpOptions): IInnerHttpOptions {
    if (!options.headers) options.headers = { }
    const isFormData = options.body instanceof FormData

    if (!isFormData) {
        options.headers['Content-Type'] = 'application/json'
    }

    if (TOKEN?.length > 0) {
        options.headers['Authorization'] = `Bearer ${TOKEN}`
    }

    const httpOptions = {
        method: options.method, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: options.headers,
        // 'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json'
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: isFormData ? options.body : JSON.stringify(options.body) // body data type must match "Content-Type" header
    }

    if (options.method === 'GET') delete httpOptions.body

    return httpOptions as IInnerHttpOptions
}

export function Get<T = any>(url: string): Promise<T> {
    return makeRequest(fetch(getUrl(url), getHttpOptions({method: 'GET', body: { }})), false)
}

export function Post<T = any>(url: string, data: any, options: IHttpOptions = { }): Promise<T> {
    return makeRequest(fetch(getUrl(url), getHttpOptions({method: 'POST', body: data, ...options})), options?.showNotification ?? true)
}

export function Put<T = any>(url: string, data: any, options: IHttpOptions = { }): Promise<T> {
    return makeRequest(fetch(getUrl(url), getHttpOptions({method: 'PUT', body: data, ...options})), options?.showNotification ?? true)
}

export function Delete<T = any>(url: string, data: any = { }, options: IHttpOptions = { }): Promise<T> {
    return new Promise((resolve, reject) => {
        openModal(() => DeleteModal({message: options?.deleteModalMessage, deleteAction: () => {
            return new Promise((actionResolve, actionReject) => {
                deleteAction(url, data, options)
                    .then(response => {actionResolve(null), resolve(response)})
                    .catch(error => {actionReject(null), reject(error)})
            })  
        }}))
    })
}

function deleteAction(url: string, data: any, options: IHttpOptions = { }): Promise<any> {
    return makeRequest(fetch(getUrl(url), getHttpOptions({method: 'DELETE', body: data, ...options})), options?.showNotification ?? true)
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
