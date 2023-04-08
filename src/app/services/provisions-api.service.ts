import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProvisionVersion, ProvisionVersionFields} from '../models/provision-version-models';
import { Guid } from "guid-typescript";
import {ProvisionHeader, ProvisionHeaderFields} from "../models/provision-header";
import {ProvisionDifference} from "../models/provision-difference";
import {DifferenceRequest} from "../models/difference-request";

@Injectable({
    providedIn: 'root',
})
export class ProvisionsApiService {
    url: string = 'http://localhost:5024/provision';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<ProvisionHeader[]> {
        return this.httpClient.get<ProvisionHeader[]>(`${this.url}/getall`);
    }

    getActualProvision(headerId: Guid): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(`${this.url}/getactualversion/${headerId.toString()}`);
    }

    getProvisionVersion(headerId: Guid, issueDate: Date): Observable<ProvisionVersion> {
        return this.httpClient.get<ProvisionVersion>(
            `${this.url}/getprovisionversion/${headerId.toString()}/${issueDate.toISOString()}`);
    }

    getProvisionHeader(headerId: Guid): Observable<ProvisionHeader> {
        return this.httpClient.get<ProvisionHeader>(`${this.url}/getprovisionheader/${headerId.toString()}`);
    }

    addProvision(provision: ProvisionHeaderFields): Observable<Guid> {
        return this.httpClient.post<Guid>(`${this.url}/addprovision`, provision);
    }

    addProvisionVersion(version: ProvisionVersionFields): Observable<Guid> {
        return this.httpClient.post<Guid>(`${this.url}/addprovisionversion`, version);
    }

    // getDifferences(originalVersion: Guid, changedVersion: Guid): Observable<ProvisionDifference> {
    //     return this.httpClient.get<ProvisionDifference>(
    //         `${this.url}/getdifferences/${originalVersion.toString()}/${changedVersion.toString()}`);
    // }

    getDifferences(differenceRequest: DifferenceRequest): Observable<ProvisionDifference> {
        return this.httpClient.post<ProvisionDifference>(`${this.url}/getdifferences`, differenceRequest);
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
}
