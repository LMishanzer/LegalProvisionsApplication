import {Component, OnInit} from '@angular/core';
import {ProvisionCreator, ProvisionVersion} from "../../models/provision-version";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";
import {ActivatedRoute, Router} from "@angular/router";
import {ProvisionHeader} from "../../models/provision-header";
import {ConfirmationDialogData} from "../../models/confirmation-dialog-data";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-provision-sidebar',
  templateUrl: './provision-sidebar.component.html',
  styleUrls: ['./provision-sidebar.component.css']
})
export class ProvisionSidebarComponent implements OnInit {
    isSidebarOpened: boolean = false;

    provision?: ProvisionHeader;
    provisionVersion: ProvisionVersion = ProvisionCreator.getEmptyProvision();

    dateOfChange: Date = new Date(0);

    currentDate?: Date;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private provisionApi: ProvisionsApiService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['provisionId'];
            this.getProvision(undefined, id);
        })
    }

    getProvision(date?: Date, id?: Guid) {
        id = id || Guid.parse(this.route.snapshot.paramMap.get('provisionId') || '');

        this.currentDate = date;

        this.provisionApi.getProvisionHeader(id).subscribe(result =>
            this.provision = result
        );

        if (date) {
            date = new Date(date);

            this.provisionApi.getProvisionVersion(id, date).subscribe(result =>
                this.provisionVersion = result
            );
        }
        else {
            this.provisionApi.getActualProvision(id).subscribe(result =>
                this.provisionVersion = result
            );
        }
    }

    openComparisonPage(): void {
        if (this.provisionVersion.fields.issueDate === this.dateOfChange)
            return;

        let [date1, date2] = this.sortDates(this.provisionVersion.fields.issueDate, this.dateOfChange)

        this.router.navigateByUrl(
            `/comparison/${this.provisionVersion.fields.provisionHeader}/${date1}/${date2}`);
    }

    deleteVersion(version: ProvisionVersion) {
        let data: ConfirmationDialogData = {
            message: "Opravdu chcete smazat tuto verzi?",
            result: false
        };
        let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: data
        });

        dialogRef.afterClosed().subscribe(_ => {
            if (data.result) {
                this.provisionApi.deleteProvisionVersion(version.id).subscribe(_ => {
                    this.getProvision();
                    this.snackBar.open('Verze byla smazána', 'Close', {
                        duration: 3000
                    });
                });
            }
        });
    }

    async deleteProvision(): Promise<void> {
        if (!this.provision)
            return;

        let headerId = this.provision?.id;
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
                    this.router.navigateByUrl('/provision-list');
                });
            }
        });
    }

    private sortDates(date1: Date, date2: Date): Date[] {
        if (date1 <= date2)
            return [date1, date2];
        return [date2, date1];
    }
}
