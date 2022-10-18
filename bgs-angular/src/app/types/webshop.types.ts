export interface IWebshopElement {
    id?: number
    name: string
    price: number
    groupid: number
    description: string
    categoryid: number
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

export class EmptyWebshopElement implements IWebshopElement {
    public id: number = 0
    public name: string = ''
    public price: number = 0
    public groupid: number = 0
    public description: string = ''
    public categoryid: number = 0
    public files: IWebshopFile[] = [new EmptyWebshopFile()]
}

export class EmptyWebshopFile implements IWebshopFile {
    public id: number = 0
    public fileid: string = ''
    public webshopelementid: number = 0
}
