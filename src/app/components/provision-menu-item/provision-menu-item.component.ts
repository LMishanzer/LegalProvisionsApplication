import {Component, Input} from '@angular/core';
import {ContentCreator, ContentItem} from "../../models/provision-version-models";

@Component({
  selector: 'app-provision-menu-item',
  templateUrl: './provision-menu-item.component.html',
  styleUrls: ['./provision-menu-item.component.css']
})
export class ProvisionMenuItemComponent {
    @Input() contentItem: ContentItem = ContentCreator.getEmptyContent();
    @Input() level: number = 0;
}
