import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiSettings} from "../api/api-settings";
import {Guid} from "guid-typescript";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private readonly url: string;

    constructor(private httpClient: HttpClient) {
        let apiSettings = new ApiSettings();
        this.url = `${apiSettings.baseUrl}/file`;
    }

    uploadFile(versionId: Guid, file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return this.httpClient.post(`${this.url}/${versionId}`, formData, {
            reportProgress: true,
            responseType: 'text'
        });
    }

    downloadFile(versionId: Guid): Observable<Blob> {
        return this.httpClient.get(`${this.url}/${versionId}`, {
            responseType: 'blob'
        });
    }
}
