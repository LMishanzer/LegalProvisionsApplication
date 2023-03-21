import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalProvision } from '../models/legal-provision-model';
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root',
})
export class ProvisionsApiService {
    uri: string = 'http://localhost:5024/Provisions';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<LegalProvision[]> {
        return this.httpClient.get<LegalProvision[]>(`${this.uri}/getall`);
    }

    getOne(id: Guid): Observable<LegalProvision> {
        return this.httpClient.get<LegalProvision>(`${this.uri}/getone/${id.toString()}`, {});
    }
}
