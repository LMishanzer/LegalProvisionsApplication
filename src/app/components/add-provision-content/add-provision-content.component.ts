import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {HeadersDialogData} from "../add-reference-dialog/headers-dialog-data";
import {AddReferenceDialogComponent} from "../add-reference-dialog/add-reference-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";
import {ProvisionHeader} from "../../models/provision-header";
import {INNER_TYPES} from "../../constants/constants";

@Component({
  selector: 'app-add-provision-content',
  templateUrl: './add-provision-content.component.html',
  styleUrls: ['./add-provision-content.component.css']
})
export class AddProvisionContentComponent implements OnInit, OnChanges {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() type?: string = '';
    @Input() availableTypes: string[] = [];
    @Input() order: number = 0;

    @Output() remove = new EventEmitter<void>();

    label: string = this.content.title || '';
    references: ProvisionHeader[] = [];
    canAddTitle: boolean = true;

    availableTypesForChildren: string[] = [];

    constructor(private dialog: MatDialog,
                private provisionService: ProvisionsApiService) {
    }

    async ngOnInit() {
        await this.getReferences();
        this.propagateTypes();
    }

    async ngOnChanges() {
        this.propagateTypes();
        await this.getReferences();

        if (this.type)
            this.canAddTitle = !INNER_TYPES.includes(this.type);

        if (!this.canAddTitle) {
            this.content.identifier = this.getIdentifier();
        }
    }

    addSection(): void {
        if (!this.content.innerItems || this.content.innerItems.length === 0) {
            this.propagateTypes();
        }

        this.content.innerItems.push(ProvisionCreator.getEmptyContent());
    }

    private propagateTypes(): void {
        let index = this.availableTypes.indexOf(this.content.innerItemsType || '');
        let shift = this.content.innerItemsType === 'Článek' ? 2 : 1;

        this.availableTypesForChildren = this.availableTypes.slice(index + shift);
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
        if (childIndex <= -1) {
            return;
        }

        this.content.innerItems.splice(childIndex, 1);

        if (this.content.innerItems.length === 0) {
            this.content.innerItemsType = undefined;
        }
    }

    addReference() {
        let data: HeadersDialogData = {
            references: this.references
        };

        let dialogRef = this.dialog.open(AddReferenceDialogComponent, {
            data: data,
        });

        dialogRef.afterClosed().subscribe(_ => {
            this.references = data.references;
            this.content.references = data.references.map(r => ({
                provisionId: r.id.toString()
            }));
        });
    }

    private getReferencesStarted: boolean = false;

    private async getReferences(): Promise<void> {
        if (this.getReferencesStarted)
            return;

        this.getReferencesStarted = true;

        try {
            if (this.content.references.length > 0 && this.references.length === 0) {
                this.references = [];

                for (let reference of this.content.references) {
                    let provisionHeader = await this.getProvision(Guid.parse(reference.provisionId));
                    this.references.push(provisionHeader);
                }
            }
        }
        finally {
            this.getReferencesStarted = false;
        }
    }

    private async getProvision(headerId: Guid): Promise<ProvisionHeader> {
        return new Promise<ProvisionHeader>((resolve) => {
            this.provisionService.getProvisionHeader(headerId).subscribe(result =>
                resolve(result)
            );
        });
    }

    private getIdentifier(): string {
        switch (this.type) {
            case 'Odstavec':
                return `(${this.order})`;
            case 'Pododstavec':
                return `${String.fromCharCode(96 + this.order)})`;
            case 'Bod':
                return `${this.order}.`;
        }

        return '';
    }
}
