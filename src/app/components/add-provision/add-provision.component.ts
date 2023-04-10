import {Component, OnInit} from '@angular/core';
import {ProvisionCreator, ProvisionVersion, ProvisionVersionFields} from "../../models/provision-version-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProvisionHeader} from "../../models/provision-header";
import {EditModeEnum} from "../../models/edit-mode-enum";
import {ActivatedRoute} from "@angular/router";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-add-provision',
  templateUrl: './add-provision.component.html',
  styleUrls: ['./add-provision.component.css']
})
export class AddProvisionComponent implements OnInit {
    provisionVersion?: ProvisionVersion;
    provisionFields: ProvisionVersionFields = ProvisionCreator.getEmptyFields();
    provisionHeader?: ProvisionHeader;
    editMode: EditModeEnum = EditModeEnum.Create;
    keywords: string = '';
    issueDate?: Date;
    availableTypes: string[] = ['Část', 'Článek', 'Odstavec'];

    constructor(private provisionsApi: ProvisionsApiService,
                private snackBar: MatSnackBar,
                private route: ActivatedRoute) {}

    ngOnInit() {
        let provisionId = this.route.snapshot.paramMap.get('provisionId');
        if (provisionId) {
            let provisionGuid = Guid.parse(provisionId);
            this.getProvisionHeader(provisionGuid);
        }

        // console.log(this.route.snapshot);
        let provisionVersionId = this.route.snapshot.paramMap.get('provisionVersionId');
        if (!provisionVersionId)
            return;

        let provisionVersionGuid = Guid.parse(provisionVersionId);
        this.getProvisionVersion(provisionVersionGuid);
    }

    saveProvision(): void {
        switch (this.editMode) {
            case EditModeEnum.Create:
                this.createNewProvision();
                break;
            case EditModeEnum.NewVersion:
                this.addNewVersion();
                break;
            case EditModeEnum.UpdateVersion:
                this.updateVersion();
                break;
        }
    }

    private createNewProvision(): void {
        let provisionHeaderFields = {
            title: this.provisionFields.content.title,
            keywords: this.keywords.split(', ')
        };

        if (!this.issueDate) {
            this.snackBar.open('Issue time must be filled', 'Close');
            return;
        }

        this.provisionFields.issueDate = this.issueDate;

        this.provisionsApi.addProvision(provisionHeaderFields).subscribe(headerId => {
            this.provisionFields.provisionHeader = headerId;
            this.provisionsApi.addProvisionVersion(this.provisionFields).subscribe(_ => {
                this.snackBar.open('Provision was successfully saved', 'Close');
            });
        });
    }

    private addNewVersion(): void {
        if (!this.issueDate) {
            this.snackBar.open('Issue time must be filled', 'Close');
            return;
        }

        if (!this.provisionHeader?.id) {
            throw new Error('Provision header ID is not defined');
        }

        this.provisionFields.provisionHeader = this.provisionHeader?.id;
        this.provisionFields.issueDate = this.issueDate;

        this.provisionsApi.addProvisionVersion(this.provisionFields).subscribe(_ => {
            this.snackBar.open('Provision was successfully saved', 'Close');
        });

        this.provisionHeader.fields.keywords = this.keywords.split(', ');
        // this.provisionsApi.
    }

    private updateVersion(): void {
        if (!this.issueDate) {
            this.snackBar.open('Issue time must be filled', 'Close');
            return;
        }

        this.provisionFields.issueDate = this.issueDate;

        if (!this.provisionVersion?.id)
            throw new Error('Provision version ID is empty.');

        this.provisionsApi.updateVersion(this.provisionVersion.id, this.provisionFields)
            .subscribe(_ =>
                this.snackBar.open('New provision version was successfully saved', 'Close'));
    }

    private getProvisionHeader(provisionId: Guid): void {
        this.provisionsApi.getProvisionHeader(provisionId).subscribe(result => {
            this.provisionHeader = result;
            this.keywords = result.fields.keywords.join(', ');
        })
        this.provisionsApi.getActualProvision(provisionId).subscribe(result => {
            // this.provisionVersion = result;
            this.provisionFields = result.fields;
        });

        this.editMode = EditModeEnum.NewVersion;
    }

    private getProvisionVersion(provisionVersionId: Guid): void {
        this.provisionsApi.getProvisionVersionById(provisionVersionId).subscribe(result => {
            this.provisionVersion = result;
            this.provisionFields = result.fields;
            this.issueDate = result.fields.issueDate;
        });
        this.editMode = EditModeEnum.UpdateVersion;
    }

    correctDate(date?: Date): Date | undefined {
        if (!date)
            return undefined;

        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
}
