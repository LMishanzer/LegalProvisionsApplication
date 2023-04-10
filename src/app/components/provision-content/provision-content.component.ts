import { Component, Input } from '@angular/core';
import {ProvisionCreator, ContentItem} from 'src/app/models/provision-version-models';

@Component({
  selector: 'app-provision-content',
  templateUrl: './provision-content.component.html',
  styleUrls: ['./provision-content.component.css']
})
export class ProvisionContentComponent {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();

}
