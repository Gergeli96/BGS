export enum ModalSize {
    lg = 'modal-lg',
    sm = 'modal-sm'
}

export enum ModalType {
    success = 'modal-success',
    warning = 'modal-warning',
    danger = 'modal-danger'
}

export abstract class ModalBase {
    public sizes = ModalSize
    public types = ModalType

    public close(result: boolean = false): void { }

    public init(data: any): void { }
}
