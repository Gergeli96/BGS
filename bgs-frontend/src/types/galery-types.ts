export interface IGaleryFile {
    id: number
    fileid: string
    galery_id: number
}

export interface IGalery {
    id?: number
    name: string
    description: string
}

export interface IDetailedGalery extends IGalery {
    files: IGaleryFile[]
}
