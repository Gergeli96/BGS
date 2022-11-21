import { IJsxElement } from "../types/general-types";
import { Page404 } from "../shared/Page404";
import { onMount, Show } from "solid-js";
import { useAuth } from "./AuthProvider";
import { Admin } from "../Admin/Admin";

export function AdminGuard(): IJsxElement {
    const auth = useAuth()

    return (
        <Show when={auth?.autenticated()} fallback={<Page404 />}>
            <Admin />
        </Show>
    )
}
