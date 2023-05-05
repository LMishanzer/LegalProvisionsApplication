import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionHeader} from "../../models/provision-header";
import {Guid} from "guid-typescript";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.css']
})
export class VersionsListComponent implements OnChanges {

    @Input() provisionHeader?: ProvisionHeader;
    @Output() versionChanged = new EventEmitter<Date>();

    dates: Date[] = [];

    selectedDate?: Date;

    constructor(private provisionApi: ProvisionsApiService,
                private route: ActivatedRoute) {
    }

    ngOnChanges() {
        this.getDates();
        this.updateDates();
    }

    getDates() {
        if (this.provisionHeader)
            return;

        let id = Guid.parse(this.route.snapshot.paramMap.get('provisionId') || '');

        this.provisionApi.getProvisionHeader(id).subscribe(result => {
            this.provisionHeader = result;
            this.updateDates();

            if (this.dates.length > 0)
                this.changeDate(this.dates[0]);
        });
    }

    changeDate(date: Date) {
        this.selectedDate = date;
        this.versionChanged.emit(date);
    }

    private updateDates(): void {
        let theArray = this.provisionHeader?.fields.datesOfChange || [];
        this.dates = theArray.reverse();

        if (this.dates.length > 0 && !this.selectedDate)
            this.selectedDate = this.dates[0];
    }
}
