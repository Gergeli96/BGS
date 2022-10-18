import { IMulterFile } from "src/interfaces/file.interfaces";
const { GoogleAuth } = require('google-auth-library');
import { Injectable } from "@nestjs/common";
const { Readable } = require('stream');
import { google } from "googleapis";

type GDriveCredentialKeys = "type" | "project_id" | "private_key_id" | "private_key" | "client_email" |
    "client_id" | "auth_uri" | "token_uri" | "auth_provider_x509_cert_url" | "client_x509_cert_url"

@Injectable()
export class ProjectFilesService {
    private readonly API_FOLDER: string = '1pgOA-p_e9dSR__dhsBoAyWDX63vrj8MA'
    private readonly GOOGLE_CREDENTIALS = this.readGooleCredentials()
    private readonly driveService
    private readonly auth

    constructor() {
        this.auth = this.authenticateGoogle()
        this.driveService = google.drive({ version: "v3", auth: this.auth })
    }


    public async uploadFiles(files: Array<IMulterFile>): Promise<string[]> {
        return await Promise.all(files.map(file => this.uploadFile(file)))
    }

    public async uploadFile(file: IMulterFile): Promise<string> {
        try {
            const fileMetadata = {
                name: file.originalname,
                parents: [this.API_FOLDER]
            }

            const media = {
                body: Readable.from(file.buffer),
                mimeType: file.mimetype
            }

            const response = await this.driveService.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: "id"
            })

            return response.data.id
        }
        catch (error) {
            return null
        }
    }


    public async deleteFiles(fileIds: string[]): Promise<any> {
        return await Promise.all(fileIds.map(fileId => this.deleteFile(fileId)))
    }

    public async deleteFile(fileId) {
        return await this.driveService.files.delete({
            fileId: fileId
        })
    }

    private authenticateGoogle() {
        const auth = new GoogleAuth({
            scopes: "https://www.googleapis.com/auth/drive",
            credentials: this.GOOGLE_CREDENTIALS
        })

        return auth
    }

    private readGooleCredentials(): any {
        const envVariable = process.env.DRIVE

        const formatValue = (value: string): string => {
            if (value[0] == '"' || value[0] == "'") value = value.substring(1)
            const lastCharIndex = value.length - 1
            if (value[lastCharIndex] == '"' || value[lastCharIndex] == "'") value = value.substring(0, lastCharIndex)

            return value
        }

        const keyValuePairs = envVariable.split(';') 
            .reduce((result, element) => {
                const [name, value] = element.split('|')
                result.set(formatValue(name) as GDriveCredentialKeys, formatValue(value))
                return result
            }, new Map<GDriveCredentialKeys, string>())

        const credentials: {[key: string]: string} = {
            "type": keyValuePairs.get('type'),
            "project_id": keyValuePairs.get('project_id'),
            "private_key_id": keyValuePairs.get('private_key_id'),
            "private_key": keyValuePairs.get('private_key'),
            "client_email": keyValuePairs.get('client_email'),
            "client_id": keyValuePairs.get('client_id'),
            "auth_uri": keyValuePairs.get('auth_uri'),
            "token_uri": keyValuePairs.get('token_uri'),
            "auth_provider_x509_cert_url": keyValuePairs.get('auth_provider_x509_cert_url'),
            "client_x509_cert_url": keyValuePairs.get('client_x509_cert_url')
        }

        return credentials
    }
}
