import {Component, Input} from '@angular/core';
import {LegalProvision} from "../../models/legal-provision-model";

@Component({
  selector: 'app-provision-menu',
  templateUrl: './provision-menu.component.html',
  styleUrls: ['./provision-menu.component.css']
})
export class ProvisionMenuComponent {
    @Input() provision: LegalProvision = {};
}
