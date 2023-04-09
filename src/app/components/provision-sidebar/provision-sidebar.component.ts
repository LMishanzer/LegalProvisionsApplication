import {Component, Input, OnInit} from '@angular/core';
import {ContentCreator, ProvisionVersion} from "../../models/provision-version-models";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {Guid} from "guid-typescript";
import {ActivatedRoute, Router} from "@angular/router";
import {ProvisionHeader} from "../../models/provision-header";

@Component({
  selector: 'app-provision-sidebar',
  templateUrl: './provision-sidebar.component.html',
  styleUrls: ['./provision-sidebar.component.css']
})
export class ProvisionSidebarComponent implements OnInit {
    @Input() isSidebarOpened: boolean = false;

    provision?: ProvisionHeader;
    provisionVersion: ProvisionVersion = ContentCreator.getEmptyProvision();

    dateOfChange: Date = new Date(0);

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

        this.provisionApi.getProvisionHeader(id).subscribe(result =>
            this.provision = result
        );

        if (date) {
            console.log(date);

            date = new Date(date);

            this.provisionApi.getProvisionVersion(id, date).subscribe(result =>
                this.provisionVersion = result
            );
        }
        else {
            this.provisionApi.getActualProvision(id).subscribe(result =>
                this.provisionVersion = result
            );
        }
    }

    openComparisonPage(): void {
        if (this.provisionVersion.fields.issueDate === this.dateOfChange)
            return;

        let [date1, date2] = this.sortDates(this.provisionVersion.fields.issueDate, this.dateOfChange)

        this.router.navigateByUrl(
            `/comparison/${this.provisionVersion.fields.provisionHeader}/${date1}/${date2}`);
    }

    private sortDates(date1: Date, date2: Date): Date[] {
        if (date1 <= date2)
            return [date1, date2];
        return [date2, date1];
    }
}
