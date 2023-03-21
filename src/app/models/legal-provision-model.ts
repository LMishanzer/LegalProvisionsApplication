import { Guid } from "guid-typescript";

export interface LegalProvision {
    id?: Guid,
    title?: string,
    articles?: Article[]
}

export interface Article {
    title?: string,
    paragraphs?: string[]
}