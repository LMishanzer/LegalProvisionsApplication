import {Component, Input} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version-models";

@Component({
  selector: 'app-provision-menu-item',
  templateUrl: './provision-menu-item.component.html',
  styleUrls: ['./provision-menu-item.component.css']
})
export class ProvisionMenuItemComponent {
    @Input() contentItem: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() type?: string;
}
