import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProvisionVersion, ProvisionVersionFields} from '../models/provision-version';
import { Guid } from "guid-typescript";
import {ProvisionHeader, ProvisionHeaderFields} from "../models/provision-header";
import {ProvisionDifference} from "../models/provision-difference";
import {DifferenceRequest} from "../models/difference-request";

@Injectable({
    providedIn: 'root',
})
export class ProvisionsApiService {
    private url: string = 'http://localhost:5024/provision';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<ProvisionHeader[]> {
        return this.httpClient.get<ProvisionHeader[]>(`${this.url}/getall`);
    }

    getProvisionHeaders(ids: Guid[]): Observable<ProvisionHeader[]> {
        return this.httpClient.post<ProvisionHeader[]>(`${this.url}/getprovisionheaders`, {
            provisionIds: ids.map(id => id.toString())
        });
    }

    getActualProvision(headerId: Guid): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(`${this.url}/getactualversion/${headerId.toString()}`);
    }

    getProvisionVersion(headerId: Guid, issueDate: Date): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(
            `${this.url}/getprovisionversion/${headerId.toString()}/${issueDate.toISOString()}`);
    }

    getProvisionVersionById(versionId: Guid): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(
            `${this.url}/getprovisionversion/${versionId.toString()}`);
    }

    getProvisionHeader(headerId: Guid): Observable<ProvisionHeader> {
        return this.httpClient.get<ProvisionHeader>(`${this.url}/getprovisionheader/${headerId.toString()}`);
    }

    addProvision(provision: ProvisionHeaderFields): Observable<Guid> {
        return this.httpClient.post<Guid>(`${this.url}/addprovision`, provision);
    }

    addProvisionVersion(version: ProvisionVersionFields): Observable<Guid> {
        let body: any = JSON.parse(JSON.stringify(version));
        body.issueDate = this.getDateOnly(version.issueDate);
        body.validFrom = this.getDateOnly(version.validFrom);
        body.takesEffectFrom = this.getDateOnly(version.takesEffectFrom);

        return this.httpClient.post<Guid>(`${this.url}/addprovisionversion`, body);
    }

    getDifferences(differenceRequest: DifferenceRequest): Observable<ProvisionDifference> {
        return this.httpClient.post<ProvisionDifference>(`${this.url}/getdifferences`, differenceRequest);
    }

    updateVersion(versionId: Guid, versionFields: ProvisionVersionFields): Observable<any> {
        return this.httpClient.put(`${this.url}/updateversion/${versionId}`, versionFields);
    }

    deleteProvision(headerId: Guid): Observable<any> {
        return this.httpClient.delete(`${this.url}/deleteprovision/${headerId.toString()}`);
    }

    deleteProvisionVersion(versionId: Guid): Observable<any> {
        return this.httpClient.delete(`${this.url}/deleteprovisionversion/${versionId}`);
    }



    getAllVersions(): Observable<ProvisionVersion[]> {
        return this.httpClient.get<ProvisionVersion[]>(`${this.url}/getall`);
    }

    getOne(id: Guid): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(`${this.url}/getone/${id.toString()}`);
    }

    create(provisionFields: ProvisionVersionFields): Observable<Guid> {
        return this.httpClient.post<Guid>(`${this.url}/create`, provisionFields);
    }

    private getDateOnly(date?: Date): string | null {
        if (!date)
            return null;

        let formattedMonth = (date.getMonth() + 1).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let formattedDay = date.getDate().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
    }
}
