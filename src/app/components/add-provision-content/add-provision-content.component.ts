import {Component, Input} from '@angular/core';
import {ContentItem} from "../../models/legal-provision-models";

@Component({
  selector: 'app-add-provision-content',
  templateUrl: './add-provision-content.component.html',
  styleUrls: ['./add-provision-content.component.css']
})
export class AddProvisionContentComponent {
    @Input() content: ContentItem = {
        textMain: '',
        title: '',
        innerItems: []
    };
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
            textMain: '',
            title: 'Random',
            type: type,
            innerItems: []
        });
        this.content.innerItemsType = type;
        this.showDropdown = false;
    }
}
