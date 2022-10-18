import { BitColumnGroup, BitColumnType } from "../BitTable/bittable-types";
import { IWebshopItemGroup } from "../types/webshop-types";
import { navigate } from "../helpers/navigation-helper";
import { IJsxElement } from "../types/general-types";
import { BitTable } from "../BitTable/BitTable";
import { useNavigate } from "@solidjs/router";
import { get } from "../helpers/http";
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
        columns.dataFetch(() => get('webshopitemgroups'))
    }

    return (<>
        <BitTable columngroup={columns}></BitTable>
        <div class="d-flex justify-end pt-2">
            <button class="btn-success mr-1" onClick={() => navigate(navigator, '/admin/webshopitemgroup')}>Új felvitele</button>
            <button class="btn-warning mr-1" onClick={() => navigate(navigator, `/admin/webshopitemgroup?id=${columns.activeRow?.id}`)}>Módosítás</button>
            <button class="btn-danger">Törlés</button>
        </div>
    </>)
}
