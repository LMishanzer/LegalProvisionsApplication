import {Component, Input, OnInit} from '@angular/core';
import { ProvisionsApiService } from 'src/app/services/provisions-api.service';
import { Guid } from "guid-typescript";
import { LegalProvision } from 'src/app/models/legal-provision-model';

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent {
    @Input() provision: LegalProvision = {};
}
