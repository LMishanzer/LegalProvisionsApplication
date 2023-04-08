import {Component, Input} from '@angular/core';
import {ContentCreator, ContentItem} from "../../models/provision-version-models";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-comparison-item-new',
  templateUrl: './comparison-item-new.component.html',
  styleUrls: ['./comparison-item-new.component.css']
})
export class ComparisonItemNewComponent {
    @Input() contentItem?: ContentItem = ContentCreator.getEmptyContent();
    @Input() addedContent?: Guid[] = [];
    @Input() changedContent?: Guid[] = [];

}
