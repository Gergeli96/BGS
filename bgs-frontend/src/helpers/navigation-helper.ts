import { Navigator } from '@solidjs/router';
import { createSignal } from 'solid-js';

export const [activeUrl, setActiveUrl] = createSignal<string>(window.location.pathname)

export function navigate(navigator: Navigator, url: string): void {
    navigator(url, { replace: true })
    setActiveUrl(url)
}

export function getQueryParams(): {[key: string]: string} {
    return Object.fromEntries(new URLSearchParams(window.location.search).entries())
}

export function clearQueryParameters(): void {
    window.history.pushState(null, '', window.location.origin + window.location.pathname) 
}
