import {Component, Input} from '@angular/core';
import {ContentCreator, ProvisionVersion} from 'src/app/models/provision-version-models';

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent {
    @Input() provision: ProvisionVersion = ContentCreator.getEmptyProvision();
}
