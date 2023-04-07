import {Component, Input, OnInit} from '@angular/core';
import {ContentCreator, ProvisionVersion} from "../../models/provision-version-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-provision-sidebar',
  templateUrl: './provision-sidebar.component.html',
  styleUrls: ['./provision-sidebar.component.css']
})
export class ProvisionSidebarComponent implements OnInit {
    @Input() isSidebarOpened: boolean = false;

    provision: ProvisionVersion = ContentCreator.getEmptyProvision();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private provisionApi: ProvisionsApiService) {
    }

    ngOnInit() {
        this.getProvision();

        // this.router.events.subscribe(val => this.getProvision())
    }

    getProvision(date?: Date) {
        let id = Guid.parse(this.route.snapshot.paramMap.get('provisionId') || '');

        if (date) {
            console.log(date);

            this.provisionApi.getProvisionVersion(id, date).subscribe(result =>
                this.provision = result
            );
        }
        else {
            this.provisionApi.getActualProvision(id).subscribe(result =>
                this.provision = result
            );
        }
    }
}
