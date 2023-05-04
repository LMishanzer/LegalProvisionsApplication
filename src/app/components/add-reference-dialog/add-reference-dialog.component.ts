import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HeadersDialogData} from "./headers-dialog-data";
import {SearchService} from "../../services/search.service";
import {ProvisionHeader} from "../../models/provision-header";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-add-reference-dialog',
  templateUrl: './add-reference-dialog.component.html',
  styleUrls: ['./add-reference-dialog.component.css']
})
export class AddReferenceDialogComponent implements OnInit {
    searchTerm: string = '';
    searchedProvisionsList: ProvisionHeader[] = [];

    constructor(public dialogRef: MatDialogRef<AddReferenceDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: HeadersDialogData,
                private searchService: SearchService) {
    }

    references: ProvisionHeader[] = [];

    ngOnInit() {
        this.references = this.references.concat(this.data.references);
    }

    addReference(provision: ProvisionHeader): void {
        let exists = this.references.filter(r => r.id === provision.id);
        if (exists.length > 0) {
            return;
        }

        this.references.push(provision);
    }

    removeReference(provision: ProvisionHeader): void {
        this.references = this.references.filter(r => r.id !== provision.id);
    }

    saveAndClose(): void {
        this.data.references = this.references;
        this.exit();
    }

    exit(): void {
        this.dialogRef.close();
    }

    search() {
        if (this.searchTerm.length === 0) {
            throw new Error('Search term cannot be empty.');
        }

        this.searchedProvisionsList = [];

        this.searchService.search(this.searchTerm).pipe(
            concatMap(items => items)
        ).subscribe(response => {
            this.searchedProvisionsList.push(response.provisionHeader);
        });
    }
}
