import {Component, Input} from '@angular/core';
import {ContentCreator, ProvisionVersion} from "../../models/provision-version-models";

@Component({
  selector: 'app-provision-menu',
  templateUrl: './provision-menu.component.html',
  styleUrls: ['./provision-menu.component.css']
})
export class ProvisionMenuComponent {
    @Input() provision: ProvisionVersion = ContentCreator.getEmptyProvision();
}
