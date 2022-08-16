import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'driveImg'
})
export class DriveImgPipe implements PipeTransform {

    public transform(imgId: string): string {
        return `http://drive.google.com/uc?export=view&id=${imgId}`
    }

}
