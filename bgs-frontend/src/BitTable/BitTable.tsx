import { BitColumnGroup, IBitColumn } from "./bittable-types";
import { IJsxElement } from "../types/general-types";
import { For, onMount } from "solid-js";
import './BitTable.scss';

export interface IBitTableProps {
    columngroup: BitColumnGroup

    onRowSelect?: (row: any | undefined) => void
}

function renderCellData(column: IBitColumn, row: any): any {
    return column.render ? column.render(column, row) : row[column.name]
}

export function BitTable(props: IBitTableProps): IJsxElement {
    let table: HTMLTableElement | undefined
    let input: HTMLInputElement | undefined

    function onTableRowClick(row: HTMLElement, data: any): void {
        if (row) {
            table?.querySelector('tbody tr.active')?.classList.remove('active')
            row?.closest('tr')?.classList.add('active')
            input?.focus()
        }

        props.columngroup.activeRow = data
        if (props.onRowSelect) props?.onRowSelect(data)
    }

    function onKeyDown(event: KeyboardEvent): void {
        let tableRow: HTMLElement | null = null

        if (event.which === 40) { // Lefelé
            tableRow = table?.querySelector('tbody tr.active')?.nextSibling as HTMLElement
        }
        else if (event.which === 38) { // Felfelé
            tableRow = table?.querySelector('tbody tr.active')?.previousSibling as HTMLElement
        }

        if (tableRow) {
            const rowIndex: string = tableRow?.getAttribute('data-index') ?? '0'
            onTableRowClick(tableRow, (props.columngroup.data() ?? [])[parseInt(rowIndex)])
        }
    }

    return (<>
        <input ref={input} type="text" class="table-input" onKeyDown={e => onKeyDown(e)} />

        <table ref={table}>
            <thead>
                <tr>
                    <For each={props.columngroup.columns}>{x =>
                        <th style={{width: x.width}}>{x.header}</th>
                    }</For>
                </tr>
            </thead>

            <tbody>
                <For each={(props.columngroup.data() ?? [])}>{(row, index) =>
                   <tr data-index={index()} onClick={e => onTableRowClick(e.currentTarget, row)}>
                        <For each={props.columngroup.columns}>{column =>
                            <td attr-type={column.type} style={column.style}>{renderCellData(column, row)}</td>
                        }</For>
                   </tr>
                }</For>
            </tbody>
        </table>
    </>)
}
