export interface IWebshopElement {
    id?: number
    name: string
    price: number
    groupid: number
    description: string
    files: IWebshopFile[]
    elementgroup?: IWebshopElementGroup
}

export interface IWebshopElementForm extends Omit<IWebshopElement, 'files'>  {
    files: FileList
}

export interface IWebshopFile {
    id: number
    fileid: string
    webshopelementid: number
}

export interface IWebshopElementGroup {
    id?: number
    name: string
    price: number
    description: string
    elements: IWebshopElement[]
}
