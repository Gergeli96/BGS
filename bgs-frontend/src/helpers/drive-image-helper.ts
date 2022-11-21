const fallbackImage: string = '/src/assets/image-not-found.png'

export function getImageLink(fileId: string, fallback: string = fallbackImage): string {
    return fileId?.length > 0 ? `http://drive.google.com/uc?export=view&id=${fileId}` : fallback 
}

export function getImageLinkFromFileList(files: Array<{fileid: string}>, fallback: string = fallbackImage): string {
    return files?.length > 0 ? getImageLink(files[0].fileid) : fallback
}
