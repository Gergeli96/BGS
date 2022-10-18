import { BitColumnGroup, BitColumnType } from "../BitTable/bittable-types";
import { navigate } from "../helpers/navigation-helper";
import { IWebshopItem } from "../types/webshop-types";
import { IJsxElement } from "../types/general-types";
import { BitTable } from "../BitTable/BitTable";
import { useNavigate } from "@solidjs/router";
import { get } from "../helpers/http";
import { onMount } from "solid-js";

export function Webshopitems(): IJsxElement {
    const columns = new BitColumnGroup<IWebshopItem>([
        {header: 'Név', name: 'name'},
        {header: 'Kivitel', name: 'design'},
        {header: 'Ár', name: 'price', type: BitColumnType.number, width: '7rem', render: (col, row) => `${row.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Ft`},
    ])
    const navigator = useNavigate()

    onMount(() => getTableData())

    function getTableData(): void {
        columns.dataFetch(() => get<IWebshopItem[]>('webshopitems'))
    }

    return (<>
        <BitTable columngroup={columns}></BitTable>
        <div class="d-flex justify-end pt-2">
            <button class="btn-success mr-1" onClick={() => navigate(navigator, '/admin/webshopitem')}>Új felvitele</button>
            <button class="btn-warning mr-1" onClick={() => navigate(navigator, `/admin/webshopitem?id=${columns.activeRow?.id}`)}>Módosítás</button>
            <button class="btn-danger">Törlés</button>
        </div>
    </>)
}
