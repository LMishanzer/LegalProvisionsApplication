import {Guid} from "guid-typescript";

export interface ProvisionDifference {
    originalVersionId: Guid;
    changedVersionId: Guid;

    removedContent: Guid[];
    addedContent: Guid[];
    changedContent: Guid[];
}
