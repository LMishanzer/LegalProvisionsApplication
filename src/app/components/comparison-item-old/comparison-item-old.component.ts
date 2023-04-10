import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version-models";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-comparison-item-old',
  templateUrl: './comparison-item-old.component.html',
  styleUrls: ['./comparison-item-old.component.css']
})
export class ComparisonItemOldComponent implements OnInit, OnChanges {
    @Input() contentItem?: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() removedContent?: Guid[] = [];

    isRemoved = false;

    ngOnInit(): void {
        this.findIfRemoved();
    }

    ngOnChanges() {
        this.findIfRemoved();
    }

    findIfRemoved() {
        let found = this.removedContent?.find(item => this.contentItem?.id === item);
        this.isRemoved = !!found;
    }
}
