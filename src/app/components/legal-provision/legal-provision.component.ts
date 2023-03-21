import { Component } from '@angular/core';
import { ProvisionsApiService } from 'src/app/services/provisions-api.service';
import { Guid } from "guid-typescript";
import { LegalProvision } from 'src/app/models/legal-provision-model';

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent {

    testId: Guid = Guid.parse('ecdc2913-9b90-40fb-9a49-6127e6224b2d');
    provision?: LegalProvision;

    constructor(private provisionService: ProvisionsApiService) {
    }

    ngOnInit() {
        this.provisionService.getOne(this.testId).subscribe(result => {
            this.provision = result;
        });
    }
}
