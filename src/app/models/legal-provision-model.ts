import { Guid } from "guid-typescript";

export interface LegalProvision {
    id?: Guid,
    creationTime?: Date,
    fields?: LegalProvisionFields
}

export interface LegalProvisionFields {
    keyWords?: string[],
    issueTime?: Date,
    content?: ContentItem
}

export interface ContentItem {
    name?: string,
    title?: string,
    textMain?: string,
    innerItems?: ContentItem[]
}
