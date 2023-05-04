import {Component, Input, OnChanges} from '@angular/core';
import {ProvisionCreator, ProvisionVersion} from 'src/app/models/provision-version';
import {ApiSettings} from "../../api/api-settings";
import {IdsDialogData} from "../provision-content/reference-dialog/IdsDialogData";
import {Guid} from "guid-typescript";
import {ReferenceDialogComponent} from "../provision-content/reference-dialog/reference-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProvisionHeader} from "../../models/provision-header";

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent implements OnChanges {
    @Input() provisionVersion: ProvisionVersion = ProvisionCreator.getEmptyProvision();
    @Input() provisionHeader?: ProvisionHeader;

    fileToDownloadUrl: string = '';

    constructor(private dialog: MatDialog,
                // private provisionApi: ProvisionsApiService
    ) {
    }

    async ngOnChanges() {
        if (!this.provisionVersion.fields.fileMetadata?.name)
            return;

        // if (!this.provisionHeader && this.provisionVersion.fields.provisionHeader !== Guid.createEmpty()) {
        //     this.provisionHeader = await this.getProvisionHeader(this.provisionVersion.fields.provisionHeader);
        // }

        let settings = new ApiSettings();
        this.fileToDownloadUrl = `${settings.baseUrl}/file/${this.provisionVersion.id}`;
    }

    openReferencesWindow(): void {
        let data: IdsDialogData = {
            referenceIds: this.provisionVersion.fields.content.references.map(ref => Guid.parse(ref.provisionId))
        };

        this.dialog.open(ReferenceDialogComponent, {
            data: data
        });
    }

    // private getProvisionHeader(headerId: Guid): Promise<ProvisionHeader> {
    //     return new Promise(resolve => {
    //         this.provisionApi.getProvisionHeader(headerId)
    //             .subscribe(result => resolve(result));
    //     })
    // }
}
