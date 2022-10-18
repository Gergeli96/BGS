import { Navigator } from '@solidjs/router';
import { createSignal } from 'solid-js';

export const [activeUrl, setActiveUrl] = createSignal<string>(window.location.pathname)

export function navigate(navigator: Navigator, url: string): void {
    navigator(url, { replace: true })
    setActiveUrl(url)
}
