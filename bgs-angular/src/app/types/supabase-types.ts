export type IFileUploadResponse = {
    data: {Key: string} | null
    error: Error | null | null
} | null

export enum SupabaseStorage {
    galery = 'galery',
    bgs = 'bgs'
}

export enum SupabaseTable {
    galerie_files = 'galerie_files',
    galeries = 'galeries'
}
