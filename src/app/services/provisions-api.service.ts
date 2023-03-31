import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LegalProvision, LegalProvisionFields} from '../models/legal-provision-models';
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root',
})
export class ProvisionsApiService {
    url: string = 'http://localhost:5024/Provisions';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<LegalProvision[]> {
        return this.httpClient.get<LegalProvision[]>(`${this.url}/getall`);
    }

    getOne(id: Guid): Observable<LegalProvision> {
        return this.httpClient.get<LegalProvision>(`${this.url}/getone/${id.toString()}`, {});
    }

    create(provisionFields: LegalProvisionFields): Observable<Guid> {
        return this.httpClient.post<Guid>(`${this.url}/create`, provisionFields);
    }
}
