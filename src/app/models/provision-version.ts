import { Guid } from "guid-typescript";
import {DataItem} from "./data-item";
import {Reference} from "./reference";

export interface ProvisionVersion extends DataItem {
    fields: ProvisionVersionFields;
}

export interface ProvisionVersionFields {
    provisionHeader: Guid;
    issueDate: Date;
    validFrom?: Date;
    takesEffectFrom?: Date;
    content: ContentItem;
    fileMetadata?: FileMetadata;
}

export interface ContentItem {
    id?: Guid;
    identifier: string,
    title: string;
    textMain: string;
    innerItemsType?: string;
    innerItems: ContentItem[];
    references: Reference[];
}

export interface FileMetadata {
    name: string;
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
            innerItems: [],
            references: []
        };
    }
}
