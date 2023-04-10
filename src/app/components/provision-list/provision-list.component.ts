import {Component, OnInit} from '@angular/core';
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionHeader} from "../../models/provision-header";
import {Guid} from "guid-typescript";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {ConfirmationDialogData} from "../../models/confirmation-dialog-data";

@Component({
  selector: 'app-provision-list',
  templateUrl: './provision-list.component.html',
  styleUrls: ['./provision-list.component.css']
})
export class ProvisionListComponent implements OnInit {

    provisionList: ProvisionHeader[] = [];

    constructor(private provisionApi: ProvisionsApiService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.provisionApi.getAll().subscribe(result => {
            this.provisionList = result;
        });
    }

    deleteProvision(headerId: Guid): void {
        let data: ConfirmationDialogData = {
            message: "Opravdu chcete smazat právní předpis?",
            result: false
        };
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe(_ => {
            if (data.result) {
                this.provisionApi.deleteProvision(headerId).subscribe(_ => {
                    this.provisionList = this.provisionList.filter(provision => provision.id !== headerId);
                });
            }
        });
    }
}
