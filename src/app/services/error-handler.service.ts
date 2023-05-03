import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ErrorBoxData} from "../components/error-box/error-box-data";
import {ErrorBoxComponent} from "../components/error-box/error-box.component";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(private dialog: MatDialog) {}

    showError(title: string, text?: string): void {
        const data: ErrorBoxData = {
            title: title,
            text: text
        };

        this.dialog.open(ErrorBoxComponent, {
            data: data
        });
    }
}
