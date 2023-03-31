import { Component } from '@angular/core';
import {ContentItem, LegalProvisionFields} from "../../models/legal-provision-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-provision',
  templateUrl: './add-provision.component.html',
  styleUrls: ['./add-provision.component.css']
})
export class AddProvisionComponent {

    constructor(private provisionsApi: ProvisionsApiService,
                private snackBar: MatSnackBar) {}

    content: ContentItem = {
        textMain: '',
        title: 'title',
        innerItems: []
    };

    saveProvision(): void {
        let provisionFields: LegalProvisionFields = {
            content: this.content
        };

        this.provisionsApi.create(provisionFields).subscribe(_ => {
            this.snackBar.open('Provision was successfully saved', 'Close');
        });
    }
}
