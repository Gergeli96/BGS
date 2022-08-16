import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path'

@Injectable()
export class ClientMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: () => void) {
        if (/[^\\/]+\.[^\\/]+$/.test(req.path)) {
            const file = this.getAssetPath(req.path);
            res.sendFile(file, (err) => {
                if (err) {
                    res.status(404).end();
                }
            });
        } else {
            return next();
        }
    }

    private getAssetPath(url: any) {
        const basePath = 'dist/frontend' // this.configService.get('CLIENT_BUILD_PATH');
        return path.join(basePath, url);
    }
}
