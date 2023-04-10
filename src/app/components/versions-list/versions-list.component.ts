import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {ProvisionHeader} from "../../models/provision-header";
import {Guid} from "guid-typescript";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.css']
})
export class VersionsListComponent implements OnInit {

    @Input() provisionHeader?: ProvisionHeader;
    @Output() versionChanged = new EventEmitter<Date>();

    constructor(private provisionApi: ProvisionsApiService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getDates();
    }

    getDates() {
        if (this.provisionHeader)
            return;

        let id = Guid.parse(this.route.snapshot.paramMap.get('provisionId') || '');

        this.provisionApi.getProvisionHeader(id).subscribe(result =>
            this.provisionHeader = result
        );
    }

    changeDate(date: Date) {
        this.versionChanged.emit(date);
    }
}
