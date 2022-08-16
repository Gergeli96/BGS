import { IGalery, IGaleryFile } from "./galery-types"

export class DetailedGalerie implements IGalery {
    public id?: number
    public name: string
    public description: string
    public files: IGaleryFile[]

    constructor(galerie: IGalery) {
        this.id = galerie.id
        this.name = galerie.name ?? ''
        this.description = galerie.description ?? ''
        this.files = Array.isArray(galerie.files) ? galerie.files : [ ]
    }
}

export class GalerieFile implements IGaleryFile {
    public id: number
    public fileid: string
    public galery_id: number

    constructor(file: IGaleryFile) {
        this.id = file.id
        this.fileid = `http://drive.google.com/uc?export=view&id=${file.fileid}`
        this.galery_id = file.galery_id
    }
}

export class GalerieCarouselElement {
    public files: GalerieFile[]
    public content: string
    public imgsrc: string
    public title: string
    public id: number

    constructor(galerie: IGalery) {
        this.imgsrc = `http://drive.google.com/uc?export=view&id=${galerie.files[0]?.fileid}`
        this.content = galerie.description ?? ''
        this.title = galerie.name ?? ''
        this.id = galerie.id ?? 0
        this.files = galerie.files.map(file => new GalerieFile(file)) ?? [ ]
    }
}
