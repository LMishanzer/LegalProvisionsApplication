import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProvisionHeader} from "../models/provision-header";
import {ApiSettings} from "../api/api-settings";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private readonly url: string;

    constructor(private httpClient: HttpClient) {
        let apiSettings = new ApiSettings();
        this.url = `${apiSettings.baseUrl}/search`;
    }

    search(keyword: string): Observable<ProvisionHeader[]> {
        return this.httpClient.post<ProvisionHeader[]>(this.url, {
            keyword: keyword
        });
    }
}
