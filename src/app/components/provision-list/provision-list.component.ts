import {Component, OnInit} from '@angular/core';
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionHeader} from "../../models/provision-header";

@Component({
  selector: 'app-provision-list',
  templateUrl: './provision-list.component.html',
  styleUrls: ['./provision-list.component.css']
})
export class ProvisionListComponent implements OnInit {

    provisionList: ProvisionHeader[] = [];

    constructor(private provisionApi: ProvisionsApiService) {
    }

    ngOnInit(): void {
        this.provisionApi.getAll().subscribe(result => {
            this.provisionList = result;
        });
    }

}
