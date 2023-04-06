import { Component } from '@angular/core';
import {ContentCreator, ContentItem, ProvisionVersionFields} from "../../models/provision-version-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-add-provision',
  templateUrl: './add-provision.component.html',
  styleUrls: ['./add-provision.component.css']
})
export class AddProvisionComponent {

    constructor(private provisionsApi: ProvisionsApiService,
                private snackBar: MatSnackBar) {}

    content: ContentItem = ContentCreator.getEmptyContent();

    // saveProvision(): void {
    //     let provisionFields: ProvisionVersionFields = {
    //         provisionHeader: Guid.createEmpty()
    //         content: this.content
    //     };
    //
    //     this.provisionsApi.create(provisionFields).subscribe(_ => {
    //         this.snackBar.open('Provision was successfully saved', 'Close');
    //     });
    // }
}
