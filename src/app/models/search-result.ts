import {ProvisionHeader} from "./provision-header";
import {Guid} from "guid-typescript";

export interface SearchResult {
    provisionHeader: ProvisionHeader;
    versionId: Guid
}
