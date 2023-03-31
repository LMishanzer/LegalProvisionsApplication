import {Component, Input} from '@angular/core';
import {ContentCreator, LegalProvision} from "../../models/legal-provision-models";

@Component({
  selector: 'app-provision-menu',
  templateUrl: './provision-menu.component.html',
  styleUrls: ['./provision-menu.component.css']
})
export class ProvisionMenuComponent {
    @Input() provision: LegalProvision = ContentCreator.getEmptyProvision();
}
