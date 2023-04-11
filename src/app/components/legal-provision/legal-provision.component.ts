import {Component, Input} from '@angular/core';
import {ProvisionCreator, ProvisionVersion} from 'src/app/models/provision-version';

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent {
    @Input() provision: ProvisionVersion = ProvisionCreator.getEmptyProvision();
}
