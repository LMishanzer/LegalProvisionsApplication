import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProvisionHeader} from "../../../models/provision-header";
import {ProvisionsApiService} from "../../../services/provisions-api.service";
import {IdsDialogData} from "./IdsDialogData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reference-dialog',
  templateUrl: './reference-dialog.component.html',
  styleUrls: ['./reference-dialog.component.css']
})
export class ReferenceDialogComponent implements OnInit {
    references: ProvisionHeader[] = [];

    constructor(private router: Router,
                public dialogRef: MatDialogRef<ReferenceDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IdsDialogData,
                private provisionService: ProvisionsApiService) {
    }

    ngOnInit() {
        this.getReferences();
    }

    getReferences() {
        this.provisionService.getProvisionHeaders(this.data.referenceIds).subscribe(response =>
            this.references = response
        );
    }

    goToProvision(provisionHeader: ProvisionHeader): void {
        this.router.navigate([`/provision/${provisionHeader.id.toString()}`]).then(() => {
            console.log(`After navigation I am on:${this.router.url}`);
        });
        this.dialogRef.close();
    }
}
