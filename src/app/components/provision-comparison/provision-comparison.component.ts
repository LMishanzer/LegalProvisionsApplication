import {Component, OnInit} from '@angular/core';
import {Guid} from "guid-typescript";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionVersion} from "../../models/provision-version-models";
import {ProvisionDifference} from "../../models/provision-difference";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-provision-comparison',
  templateUrl: './provision-comparison.component.html',
  styleUrls: ['./provision-comparison.component.css']
})
export class ProvisionComparisonComponent implements OnInit {
    provisionId: Guid = Guid.createEmpty();
    firstIssueDate: Date = new Date();
    secondIssueDate: Date = new Date();

    removedContent: Guid[] = [];

    firstVersion?: ProvisionVersion;
    secondVersion?: ProvisionVersion;

    difference?: ProvisionDifference;

    constructor(private provisionApi: ProvisionsApiService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getDataFromUrl();

        this.getVersions();
        this.getDifference();
    }

    getDataFromUrl(): void {
        this.provisionId = Guid.parse(this.route.snapshot.paramMap.get('provisionId') || '');
        this.firstIssueDate = new Date(this.route.snapshot.paramMap.get('date1') || '');
        this.secondIssueDate = new Date(this.route.snapshot.paramMap.get('date2') || '');
    }

    getVersions() {
        this.provisionApi.getProvisionVersion(this.provisionId, this.firstIssueDate)
            .subscribe(result => this.firstVersion = result);
        this.provisionApi.getProvisionVersion(this.provisionId, this.secondIssueDate)
            .subscribe(result => this.secondVersion = result);
    }

    getDifference() {
        // let val = JSON.stringify({
        //     provisionId: this.provisionId.toString(),
        //     firstProvisionIssue: this.firstIssueDate,
        //     secondProvisionIssue: this.secondIssueDate
        // });
        //
        // console.log(val);

        this.provisionApi.getDifferences({
            provisionId: this.provisionId.toString(),
            firstProvisionIssue: this.firstIssueDate,
            secondProvisionIssue: this.secondIssueDate
        }).subscribe(result => {
            this.difference = result;
            this.removedContent = result.removedContent
            console.log(this.difference);
        });
    }
}
