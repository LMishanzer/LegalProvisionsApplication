import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ProvisionCreator, ContentItem} from "../../models/provision-version-models";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-comparison-item-new',
  templateUrl: './comparison-item-new.component.html',
  styleUrls: ['./comparison-item-new.component.css']
})
export class ComparisonItemNewComponent implements OnInit, OnChanges {
    @Input() contentItem?: ContentItem = ProvisionCreator.getEmptyContent();
    @Input() addedContent?: Guid[] = [];
    @Input() changedContent?: Guid[] = [];

    isChanged: boolean = false;
    isAdded: boolean = false;

    ngOnChanges(): void {
        this.findIfAdded();
        this.findIfChanged();
    }

    ngOnInit(): void {
        this.findIfAdded();
        this.findIfChanged();
    }

    findIfChanged(): void {
        let found = this.changedContent?.find(item => this.contentItem?.id === item);
        this.isChanged = !!found;
    }

    findIfAdded(): void {
        let found = this.addedContent?.find(item => this.contentItem?.id === item);
        this.isAdded = !!found;
    }
}
