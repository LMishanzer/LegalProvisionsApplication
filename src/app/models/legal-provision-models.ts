import { Guid } from "guid-typescript";

export interface LegalProvision {
    id?: Guid,
    creationTime?: Date,
    fields: LegalProvisionFields
}

export interface LegalProvisionFields {
    keyWords?: string[],
    issueTime?: Date,
    content: ContentItem
}

export interface ContentItem {
    name?: string,
    title: string,
    textMain: string,
    innerItems: ContentItem[]
}

export class ContentCreator {
    static getEmptyProvision(): LegalProvision {
        return {
            fields: this.getEmptyFields()
        };
    }

    static getEmptyFields(): LegalProvisionFields {
        return {
            content: this.getEmptyContent()
        };
    }

    static getEmptyContent(): ContentItem {
        return {
            title: '',
            textMain: '',
            innerItems: []
        };
    }
}
