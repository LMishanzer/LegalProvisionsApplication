import {Component, Input} from '@angular/core';
import {ContentCreator, ContentItem} from "../../models/provision-version-models";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-add-provision-content',
  templateUrl: './add-provision-content.component.html',
  styleUrls: ['./add-provision-content.component.css']
})
export class AddProvisionContentComponent {
    @Input() content: ContentItem = ContentCreator.getEmptyContent();
    @Input() order: number = 0;

    label: string = this.content.title || '';
    showDropdown: boolean = false;
    titleVisible: boolean = true;
    textMainVisible: boolean = true;

    switchDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    addSection(type: string): void {
        this.content.innerItems.push({
            id: Guid.createEmpty(),
            textMain: '',
            title: 'Random',
            innerItems: []
        });
        this.content.innerItemsType = type;
        this.showDropdown = false;
    }
}
