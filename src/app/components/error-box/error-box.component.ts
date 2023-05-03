import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorBoxData} from "./error-box-data";

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent {
    constructor(public dialogRef: MatDialogRef<ErrorBoxComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ErrorBoxData) {
    }
}
