import { IModalButton, ModalScaffold } from "./ModalScaffold";
import { IJsxElement } from "../types/general-types";

export interface IConfirmModalProps {
    callback: (accepted: boolean) => void
    message: string
}

export function ConfirmModal(props: IConfirmModalProps): IJsxElement {
    const modalButtons: IModalButton[] = [
        {name: 'Nem', className: 'btn-info mr-1', onclick: closer => onButtonClick(closer, false)},
        {name: 'Igen', className: 'btn-danger', onclick: closer => onButtonClick(closer, true)}
    ]

    function onButtonClick(closer: () => void, accepted: boolean): void {
        closer()
        props.callback(accepted)
    }

    return (
        <ModalScaffold name="Megerősítés" buttons={modalButtons}>
            {props.message}
        </ModalScaffold>
    )
}
