import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProvisionHeader} from "../models/provision-header";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private url: string = 'http://localhost:5024/search';

    constructor(private httpClient: HttpClient) { }

    search(keyword: string): Observable<ProvisionHeader[]> {
        return this.httpClient.post<ProvisionHeader[]>(this.url, {
            keyword: keyword
        });
    }
}
