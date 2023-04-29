import {Component, Input, OnChanges} from '@angular/core';
import {ContentItem, ProvisionCreator, ProvisionVersion} from "../../models/provision-version";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";

interface ExampleFlatNode {
    expandable: boolean;
    title: string;
    level: number;
}

@Component({
  selector: 'app-provision-menu',
  templateUrl: './provision-menu.component.html',
  styleUrls: ['./provision-menu.component.css']
})
export class ProvisionMenuComponent implements OnChanges {
    @Input() provision: ProvisionVersion = ProvisionCreator.getEmptyProvision();

    private _transformer(node: ContentItem, level: number): ExampleFlatNode {
        return {
            expandable: !!node.innerItems && node.innerItems.length > 0 && node.innerItemsType !== 'Bod',
            title: node.title,
            level: level,
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
        this.dataSource.data = this.provision.fields.content.innerItems;
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
