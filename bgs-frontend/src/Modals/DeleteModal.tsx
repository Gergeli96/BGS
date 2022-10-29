import { IModalButton, ModalScaffold } from "./ModalScaffold";
import { IJsxElement } from "../types/general-types";

export interface IDeleteModalProps {
    deleteAction: () => Promise<any>
    message?: string
}

export function DeleteModal(props: IDeleteModalProps): IJsxElement {
    const modalButtons: IModalButton[] = [
        {name: 'Mégsem', className: 'btn-info mr-1', onclick: closer => closer()},
        {name: 'Törlés', className: 'btn-danger', onclick: closer => deleteAction(closer)}
    ]

    function deleteAction(closer: () => void): void {
        props.deleteAction()
            .then(response => closer())
            .catch(error => { })
    }

    return (
        <ModalScaffold name="Törlés" buttons={modalButtons}>
            {props.message ? props.message : 'Biztosan törölni szeretné?'}
        </ModalScaffold>
    )
}
