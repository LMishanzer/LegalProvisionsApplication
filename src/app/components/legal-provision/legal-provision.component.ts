import {Component, Input, OnChanges} from '@angular/core';
import {ProvisionCreator, ProvisionVersion} from 'src/app/models/provision-version';
import {ApiSettings} from "../../api/api-settings";
import {IdsDialogData} from "../provision-content/reference-dialog/IdsDialogData";
import {Guid} from "guid-typescript";
import {ReferenceDialogComponent} from "../provision-content/reference-dialog/reference-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent implements OnChanges {
    @Input() provision: ProvisionVersion = ProvisionCreator.getEmptyProvision();

    fileToDownloadUrl: string = '';

    constructor(private dialog: MatDialog) {
    }

    ngOnChanges() {
        if (!this.provision.fields.fileMetadata?.name)
            return;

        let settings = new ApiSettings();
        this.fileToDownloadUrl = `${settings.baseUrl}/file/${this.provision.id}`;
    }

    openReferencesWindow(): void {
        let data: IdsDialogData = {
            referenceIds: this.provision.fields.content.references.map(ref => Guid.parse(ref.provisionId))
        };

        this.dialog.open(ReferenceDialogComponent, {
            data: data
        });
    }
}
