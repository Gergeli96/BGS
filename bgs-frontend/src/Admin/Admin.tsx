import { IJsxElement } from "../types/general-types";
import { AdminSidebar } from "./AdminSidebar";
import { Outlet } from "@solidjs/router";
import './Admin.scss';

export function Admin(): IJsxElement {

    return (
        <div class="admin-container d-flex">
            <AdminSidebar />

            <div class="admin-content p-4">
                <Outlet/>
            </div>
        </div>
    )
}
