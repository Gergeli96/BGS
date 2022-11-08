import { IJsxElement } from "../types/general-types";
import { Page404 } from "../shared/Page404";
import { Admin } from "../Admin/Admin";
import { useAuth } from "./auth";
import { onMount, Show } from "solid-js";

export function AdminGuard(): IJsxElement {
    const auth = useAuth()

    onMount(() => console.log(auth))
    

    return (
        <Show when={auth?.isLoggedIn} fallback={<Page404 />}>
            <Admin />
        </Show>
    )
}
