import { Guid } from "guid-typescript";
import {DataItem} from "./data-item";

export interface ProvisionVersion extends DataItem {
    fields: ProvisionVersionFields;
}

export interface ProvisionVersionFields {
    provisionHeader: Guid;
    issueDate: Date;
    validFrom?: Date;
    takesEffectFrom?: Date;
    content: ContentItem;
}

export interface ContentItem {
    id?: Guid;
    identifier: string,
    title: string;
    textMain: string;
    innerItemsType?: string;
    innerItems: ContentItem[];
}

export class ProvisionCreator {
    static getEmptyProvision(): ProvisionVersion {
        return {
            id: Guid.createEmpty(),
            creationTime: new Date(),
            fields: this.getEmptyFields()
        };
    }

    static getEmptyFields(): ProvisionVersionFields {
        return {
            provisionHeader: Guid.createEmpty(),
            issueDate: new Date(0),
            content: this.getEmptyContent()
        };
    }

    static getEmptyContent(): ContentItem {
        return {
            identifier: '',
            title: '',
            textMain: '',
            innerItems: []
        };
    }
}
