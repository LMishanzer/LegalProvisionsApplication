import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiSettings} from "../api/api-settings";
import {SearchResult} from "../models/search-result";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private readonly url: string;

    constructor(private httpClient: HttpClient) {
        let apiSettings = new ApiSettings();
        this.url = `${apiSettings.baseUrl}/search`;
    }

    search(keyword: string): Observable<SearchResult[]> {
        return this.httpClient.post<SearchResult[]>(this.url, {
            keyword: keyword
        });
    }
}
