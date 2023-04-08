import {Component, Input, OnInit} from '@angular/core';
import {Guid} from "guid-typescript";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionVersion} from "../../models/provision-version-models";
import {ProvisionDifference} from "../../models/provision-difference";

@Component({
  selector: 'app-provision-comparison',
  templateUrl: './provision-comparison.component.html',
  styleUrls: ['./provision-comparison.component.css']
})
export class ProvisionComparisonComponent implements OnInit {
    @Input() provisionId: Guid = Guid.createEmpty();
    @Input() firstIssueDate: Date = new Date();
    @Input() secondIssueDate: Date = new Date();

    removedContent: Guid[] = [];

    firstVersion?: ProvisionVersion;
    secondVersion?: ProvisionVersion;

    difference?: ProvisionDifference;

    constructor(private provisionApi: ProvisionsApiService) {
    }

    ngOnInit(): void {
        this.getVersions();
        this.getDifference();
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
