import {Component, Input} from '@angular/core';
import {ContentCreator, LegalProvision} from 'src/app/models/legal-provision-models';

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent {
    @Input() provision: LegalProvision = ContentCreator.getEmptyProvision();
}
