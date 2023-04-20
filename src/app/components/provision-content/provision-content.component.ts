import {Component, Input} from '@angular/core';
import {ProvisionCreator, ContentItem} from 'src/app/models/provision-version';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReferenceDialogComponent} from "./reference-dialog/reference-dialog.component";
import {IdsDialogData} from "./reference-dialog/IdsDialogData";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-provision-content',
  templateUrl: './provision-content.component.html',
  styleUrls: ['./provision-content.component.css']
})
export class ProvisionContentComponent {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();

    constructor(private router: Router,
                private dialog: MatDialog) {
    }

    openReferencesWindow(): void {
        let data: IdsDialogData = {
            referenceIds: this.content.references.map(ref => Guid.parse(ref.provisionId))
        };

        this.dialog.open(ReferenceDialogComponent, {
            data: data
        });
    }
}
