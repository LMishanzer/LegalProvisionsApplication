import {Component, OnInit} from '@angular/core';
import {LegalProvision} from "../../models/legal-provision-model";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-provision-sidebar',
  templateUrl: './provision-sidebar.component.html',
  styleUrls: ['./provision-sidebar.component.css']
})
export class ProvisionSidebarComponent implements OnInit {
    provision: LegalProvision = {};

    isSidebarOpened: boolean = false;

    constructor(private provisionsApiService: ProvisionsApiService) {
    }

    ngOnInit() {
        this.provisionsApiService.getOne(Guid.parse('b7c77cc5-efd8-4c9d-9019-60201f0d5567'))
            .subscribe(result => this.provision = result);
    }

    openCloseSidebar() {
        this.isSidebarOpened = !this.isSidebarOpened;
    }
}
