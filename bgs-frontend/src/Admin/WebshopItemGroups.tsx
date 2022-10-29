import { BitColumnGroup, BitColumnType } from "../BitTable/bittable-types";
import { IWebshopItemGroup } from "../types/webshop-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { BitTable } from "../BitTable/BitTable";
import { useNavigate } from "@solidjs/router";
import { Delete, Get } from "../helpers/http";
import { onMount } from "solid-js";

export function WebshipItemGroups(): IJsxElement {
    const columns = new BitColumnGroup<IWebshopItemGroup>([
        {header: 'Név', name: 'name'},
        {header: 'Ár', name: 'price', type: BitColumnType.number, width: '7rem', render: (col, row) => `${row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`},
        {header: 'Leírás', name: 'description'}
    ])
    const navigator = useNavigate()

    onMount(() => getGroups())

    function getGroups(): void {
        columns.dataFetch(() => Get('webshopitemgroups'))
    }

    function deleteAction(): void {
        if (columns.activeRow) {
            Delete(`webshopitemgroups/delete/${columns.activeRow?.id}`, { }, {deleteModalMessage: 'Ennek az adatnak a törlésével törlődni fog az összes hozzá kacsolódó bútordarab a webshopban. Biztosan törölni szeretnéd?'})
                .then(response => getGroups())
                .catch(error => { })
        }
    }

    function toEdit(): void {
        if (columns.activeRow) {
            navigate(navigator, `/admin/webshopitemgroup/${columns.activeRow?.id}`)
        }
    }

    return (<>
        <BitTable columngroup={columns}></BitTable>
        <div class="d-flex justify-end pt-2">
            <button class="btn-success mr-1" onClick={() => navigate(navigator, '/admin/webshopitemgroup')}>Új felvitele</button>
            <button class="btn-warning mr-1" onClick={toEdit}>Módosítás</button>
            <button class="btn-danger" onClick={deleteAction}>Törlés</button>
        </div>
    </>)
}
