export interface IWebshopFile {
    webshopelementid: number
    fileid: string
    id: number
}

export interface IWebshopItemGroup {
    id?: number
    name: string
    price: number
    description: string
}

export interface IWebshopItemGroupForm extends IWebshopItemGroup {
    edititems?: boolean
}

export interface IDetailedWebshopItemGroup extends IWebshopItemGroup {
    id?: number
    name: string
    price: number
    description: string
    elements: IWebshopItem[]
}

export interface IWebshopItem {
    id?: number
    name: string
    design: string
    price: number
    groupid: number
    description: string
    categoryid: number
}

export interface IWebshopItemForm extends IWebshopItem {
    files: any
}

export interface IWebshopItemOverView {
    connecting: IDetailedWebshopItem[]
    item: IDetailedWebshopItem
}

export class EmptyWebshopItemGroup implements IWebshopItemGroup {
    public id?: number = undefined
    public name: string = ''
    public price: number = 0
    public description: string = ''
}


export interface IDetailedWebshopItem extends IWebshopItem {
    files: IWebshopFile[]
    elementgroup: IWebshopItemGroup
}

export class EmptyWebshopElement implements IWebshopItem {
    public id?: number = 0
    public name: string = ''
    public design: string = ''
    public price: number = 0
    public groupid: number = 0
    public description: string = ''
    public categoryid: number = 0
}

export class EmptyDetailedWebshopItem extends EmptyWebshopElement implements IDetailedWebshopItem {
    public elementgroup: IWebshopItemGroup = new EmptyWebshopItemGroup()
    public files: IWebshopFile[] = [ ]
}
