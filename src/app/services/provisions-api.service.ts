import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProvisionVersion, ProvisionVersionFields} from '../models/provision-version';
import { Guid } from "guid-typescript";
import {ProvisionHeader, ProvisionHeaderFields} from "../models/provision-header";
import {ProvisionDifference} from "../models/provision-difference";
import {DifferenceRequest} from "../models/difference-request";
import {ApiSettings} from "../api/api-settings";

@Injectable({
    providedIn: 'root',
})
export class ProvisionsApiService {
    private readonly url: string;

    constructor(private httpClient: HttpClient) {
        let apiSettings = new ApiSettings();
        this.url = `${apiSettings.baseUrl}/provision`;
    }

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

    addProvisionVersion(versionFields: ProvisionVersionFields): Observable<Guid> {
        let body = this.getFormattedBody(versionFields);
        return this.httpClient.post<Guid>(`${this.url}/addprovisionversion`, body);
    }

    getDifferences(differenceRequest: DifferenceRequest): Observable<ProvisionDifference> {
        return this.httpClient.post<ProvisionDifference>(`${this.url}/getdifferences`, differenceRequest);
    }

    updateVersion(versionId: Guid, versionFields: ProvisionVersionFields): Observable<any> {
        let body = this.getFormattedBody(versionFields);
        return this.httpClient.put(`${this.url}/updateversion/${versionId.toString()}`, body);
    }

    updateHeader(headerId: Guid, headerFields: ProvisionHeaderFields): Observable<any> {
        return this.httpClient.put(`${this.url}/updateheader/${headerId.toString()}`, headerFields);
    }

    deleteProvision(headerId: Guid): Observable<any> {
        return this.httpClient.delete(`${this.url}/deleteprovision/${headerId.toString()}`);
    }

    deleteProvisionVersion(versionId: Guid): Observable<any> {
        return this.httpClient.delete(`${this.url}/deleteprovisionversion/${versionId}`);
    }

    create(provisionFields: ProvisionVersionFields): Observable<Guid> {
        let body = this.getFormattedBody(provisionFields);
        return this.httpClient.post<Guid>(`${this.url}/create`, body);
    }

    private getDateOnly(date?: Date): string | null {
        if (!date)
            return null;

        try {
            let formattedMonth = (date?.getMonth() + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            let formattedDay = date.getDate().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
        }
        catch (e) {
            console.error(e);
            return date?.toString() || '';
        }
    }

    private getFormattedBody(version: ProvisionVersionFields): any {
        let body: any = JSON.parse(JSON.stringify(version));
        body.issueDate = this.getDateOnly(version.issueDate);
        body.validFrom = this.getDateOnly(version.validFrom);
        body.takesEffectFrom = this.getDateOnly(version.takesEffectFrom);

        return body;
    }
}
