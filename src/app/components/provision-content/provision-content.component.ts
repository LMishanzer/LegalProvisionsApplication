import {Component, Input, OnInit} from '@angular/core';
import {ProvisionCreator, ContentItem} from 'src/app/models/provision-version';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ReferenceDialogComponent} from "./reference-dialog/reference-dialog.component";
import {IdsDialogData} from "./reference-dialog/IdsDialogData";
import {Guid} from "guid-typescript";
import {ContentTypeHelper} from "../../helpers/content-type-helper";

@Component({
  selector: 'app-provision-content',
  templateUrl: './provision-content.component.html',
  styleUrls: ['./provision-content.component.css']
})
export class ProvisionContentComponent implements OnInit {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() itemType?: string;
    @Input() order?: number;

    private dontShowHeaderWith: string[] = ContentTypeHelper.innerTypes;

    showHeader: boolean = false;

    constructor(private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.showHeader = !this.dontShowHeaderWith.includes(this.itemType || '');
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
