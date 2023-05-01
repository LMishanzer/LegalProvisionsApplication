import {Component, Input, OnChanges} from '@angular/core';
import {ContentItem, ProvisionVersion} from "../../models/provision-version";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {ContentTypeHelper} from "../../helpers/content-type-helper";
import {Guid} from "guid-typescript";

interface ExampleFlatNode {
    expandable: boolean;
    title: string;
    id?: Guid;
    level: number;
    type?: string;
    identifier: string
}

@Component({
  selector: 'app-provision-menu',
  templateUrl: './provision-menu.component.html',
  styleUrls: ['./provision-menu.component.css']
})
export class ProvisionMenuComponent implements OnChanges {
    @Input() provision?: ProvisionVersion;

    private _transformer(node: ContentItem, level: number): ExampleFlatNode {
        return {
            expandable: !!node.innerItems && node.innerItems.length > 0
                && !ContentTypeHelper.isInnerType(node.innerItemsType),
            title: node.title,
            level: level,
            id: node.id,
            identifier: node.identifier,
            type: node.type
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.innerItems,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    ngOnChanges() {
        if (this.provision) {
            this.propagateTypes(this.provision.fields.content);
            this.dataSource.data = this.provision.fields.content.innerItems;
        }
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    scroll(id: string): void {
        const itemToScrollTo = document.getElementById(id);
        if (itemToScrollTo) {
            itemToScrollTo.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    private propagateTypes(contentItem: ContentItem) {
        for (let child of contentItem.innerItems) {
            child.type = contentItem.innerItemsType;

            this.propagateTypes(child);
        }
    }
}
