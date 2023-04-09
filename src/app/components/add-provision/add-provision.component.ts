import { Component } from '@angular/core';
import {ContentCreator, ProvisionVersionFields} from "../../models/provision-version-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProvisionHeaderFields} from "../../models/provision-header";

@Component({
  selector: 'app-add-provision',
  templateUrl: './add-provision.component.html',
  styleUrls: ['./add-provision.component.css']
})
export class AddProvisionComponent {

    constructor(private provisionsApi: ProvisionsApiService,
                private snackBar: MatSnackBar) {}

    provisionFields: ProvisionVersionFields = ContentCreator.getEmptyFields();
    keywords: string = '';
    // provisionHeader: ProvisionHeaderFields = {
    //     title: '',
    //     keywords: [],
    //     datesOfChange: []
    // };
    // content: ContentItem = ContentCreator.getEmptyContent();
    availableTypes: string[] = ['Část', 'Článek', 'Odstavec'];

    saveProvision(): void {
        let provision: ProvisionHeaderFields = {
            title: this.provisionFields.content.title,
            keywords: this.keywords.split(', ')
        }

        this.provisionsApi.addProvision(provision).subscribe(headerId => {
            this.provisionFields.provisionHeader = headerId;
            this.provisionsApi.addProvisionVersion(this.provisionFields).subscribe(_ => {
                this.snackBar.open('Provision was successfully saved', 'Close');
            });
        });
    }
}
