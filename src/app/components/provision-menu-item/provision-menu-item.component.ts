import {Component, Input} from '@angular/core';
import {ContentItem} from "../../models/legal-provision-models";

@Component({
  selector: 'app-provision-menu-item',
  templateUrl: './provision-menu-item.component.html',
  styleUrls: ['./provision-menu-item.component.css']
})
export class ProvisionMenuItemComponent {
    @Input() contentItem: ContentItem = {
        title: '',
        textMain: '',
        innerItems: []
    };
    @Input() level: number = 0;
}
