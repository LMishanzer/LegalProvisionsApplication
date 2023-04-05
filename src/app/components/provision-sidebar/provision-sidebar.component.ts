import {Component, Input, OnInit} from '@angular/core';
import {ContentCreator, LegalProvision} from "../../models/legal-provision-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-provision-sidebar',
  templateUrl: './provision-sidebar.component.html',
  styleUrls: ['./provision-sidebar.component.css']
})
export class ProvisionSidebarComponent implements OnInit {
    @Input() isSidebarOpened: boolean = false;

    provision: LegalProvision = ContentCreator.getEmptyProvision();

    constructor(private provisionsApiService: ProvisionsApiService) {
    }

    ngOnInit() {
        this.provisionsApiService.getOne(Guid.parse('3b73be6c-676f-4794-8805-320a6c91e0c6'))
            .subscribe(result => this.provision = result);
    }
}
