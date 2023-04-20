import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {HeadersDialogData} from "../add-reference-dialog/headers-dialog-data";
import {AddReferenceDialogComponent} from "../add-reference-dialog/add-reference-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";
import {ProvisionHeader} from "../../models/provision-header";

@Component({
  selector: 'app-add-provision-content',
  templateUrl: './add-provision-content.component.html',
  styleUrls: ['./add-provision-content.component.css']
})
export class AddProvisionContentComponent implements OnInit {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() type?: string = '';
    @Input() availableTypes: string[] = [];

    @Output() remove = new EventEmitter<void>();

    label: string = this.content.title || '';
    identifierVisible: boolean = true;
    titleVisible: boolean = true;
    textMainVisible: boolean = true;
    references: ProvisionHeader[] = [];

    availableTypesForChildren: string[] = [];

    constructor(private dialog: MatDialog,
                private provisionService: ProvisionsApiService) {
    }

    async ngOnInit() {
        await this.getReferences();
    }

    addSection(): void {
        if (!this.content.innerItems || this.content.innerItems.length === 0) {
            let index = this.availableTypes.indexOf(this.content.innerItemsType || '');
            this.availableTypesForChildren = this.availableTypes.slice(index + 1);
        }

        this.content.innerItems.push(ProvisionCreator.getEmptyContent());
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.content.innerItems, event.previousIndex, event.currentIndex);
    }

    removeNewLines(text: string): string {
        return text.replace(new RegExp('\n', 'g'), ' ');
    }

    removeElement() {
        this.remove.emit();
    }

    childRemoved(childIndex: number) {
        if (childIndex > -1) {
            this.content.innerItems.splice(childIndex, 1);
        }
    }

    addReference() {
        let data: HeadersDialogData = {
            references: this.references
        };

        console.log(data);

        let dialogRef = this.dialog.open(AddReferenceDialogComponent, {
            data: data,
            // width: '700px',
            // height: '400px'
        });

        dialogRef.afterClosed().subscribe(_ => {
            this.references = data.references;
            this.content.references = data.references.map(r => ({
                provisionId: r.id.toString()
            }));

            console.log(data.references);
        });
    }

    private async getReferences(): Promise<void> {
        if (this.content.references.length > 0) {
            for (let reference of this.content.references) {
                let provisionHeader = await this.getProvision(Guid.parse(reference.provisionId));
                this.references.push(provisionHeader);
            }
        }
    }

    private async getProvision(headerId: Guid): Promise<ProvisionHeader> {
        return new Promise<ProvisionHeader>((resolve) => {
            this.provisionService.getProvisionHeader(headerId).subscribe(result =>
                resolve(result)
            );
        });
    }
}
