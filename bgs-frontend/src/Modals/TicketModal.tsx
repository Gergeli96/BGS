import { ticketPrioritySelectOptions, ticketStateSelectOptions } from "../helpers/common-select-options";
import { BitType, IBitControl, IBitFormButton } from "../BitForm/bitform-types";
import { IJsxElement } from "../types/general-types";
import { ModalScaffold } from "./ModalScaffold";
import { ITicket } from "../types/ticket-types";
import { BitForm } from "../BitForm/BitForm";

export interface ITicketModalProps {
    ticket?: ITicket
}

export function TicketModal(props?: ITicketModalProps): IJsxElement {
    const controls: IBitControl[] = [
        {label: 'Név', name: 'name', value: props?.ticket?.name ?? ''},
        {label: 'Projekt', name: 'projectid', type: BitType.select, options: [ ], value: props?.ticket?.projectid ?? ''},
        {label: 'Prioritás', name: 'priority', type: BitType.select, options: ticketPrioritySelectOptions, value: props?.ticket?.priority ?? ''},
        {label: 'Státusz', name: 'state', type: BitType.select, options: ticketStateSelectOptions, value: props?.ticket?.state ?? ''},
        {label: 'Leírás', name: 'description', type: BitType.textarea, value: props?.ticket?.description ?? ''}
    ]
    const formButtons: IBitFormButton[] = [
        {name: 'Mentés', className: 'btn-success', onclick: save}
    ]

    function save(formValue: any): void {
        console.log(formValue)
    }

    return (
        <ModalScaffold name="Jegy felvitel">
            <BitForm controls={controls} save={save} buttons={formButtons}></BitForm>
        </ModalScaffold>
    )
}
