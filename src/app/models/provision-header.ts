import {DataItem} from "./data-item";

export interface ProvisionHeader extends DataItem {
    fields: ProvisionHeaderFields;
}

export interface ProvisionHeaderFields {
    title: string;
    keywords: string[];
    datesOfChange?: Date[];
}
