import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ClientService {

    public async getApp() {
        const filePath = path.resolve(path.join('dist/frontend', 'index.html'))
        
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    
}
