import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReferenceDialogData} from "./reference-dialog-data";

@Component({
  selector: 'app-add-reference-dialog',
  templateUrl: './add-reference-dialog.component.html',
  styleUrls: ['./add-reference-dialog.component.css']
})
export class AddReferenceDialogComponent {
    constructor(public dialogRef: MatDialogRef<AddReferenceDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ReferenceDialogData) {
    }

    references: string[] = [];

    addReference(): void {
        this.references.push('');
    }

    saveAndClose(): void {
        this.data.references = this.references.map(ref => ({provisionId: ref}));
        this.exit();
    }

    exit(): void {
        this.dialogRef.close();
    }
}
