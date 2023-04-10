import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version-models";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-add-provision-content',
  templateUrl: './add-provision-content.component.html',
  styleUrls: ['./add-provision-content.component.css']
})
export class AddProvisionContentComponent {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() type?: string = '';
    @Input() availableTypes: string[] = [];

    @Output() remove = new EventEmitter<void>();

    label: string = this.content.title || '';
    identifierVisible: boolean = true;
    titleVisible: boolean = true;
    textMainVisible: boolean = true;

    availableTypesForChildren: string[] = [];

    addSection(): void {
        if (!this.content.innerItems || this.content.innerItems.length === 0) {
            let index = this.availableTypes.indexOf(this.content.innerItemsType || '');
            this.availableTypesForChildren = this.availableTypes.slice(index + 1);
        }

        this.content.innerItems.push({
            identifier: '',
            textMain: '',
            title: '',
            innerItems: []
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.content.innerItems, event.previousIndex, event.currentIndex);
    }

    removeNewLines(text: string): string {
        return text.replace('\n', '');
    }

    removeElement() {
        this.remove.emit();
    }

    childRemoved(childIndex: number) {
        if (childIndex > -1) {
            this.content.innerItems.splice(childIndex, 1);
        }
    }
}
