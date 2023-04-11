import {DataItem} from "./data-item";

export interface ProvisionHeader extends DataItem {
    fields: ProvisionHeaderFields;
}

export interface ProvisionHeaderFields {
    title: string;
    issuer: string;
    keywords: string[];
    datesOfChange?: Date[];
}

export class ProvisionHeaderCreator {
    static getEmptyHeaderFields(): ProvisionHeaderFields {
        return {
            title: '',
            issuer: '',
            keywords: []
        }
    }
}
