import {Component, Input, OnInit} from '@angular/core';
import {ProvisionCreator, ProvisionVersion} from 'src/app/models/provision-version';
import {ApiSettings} from "../../api/api-settings";

@Component({
  selector: 'app-legal-provision',
  templateUrl: './legal-provision.component.html',
  styleUrls: ['./legal-provision.component.css']
})
export class LegalProvisionComponent implements OnInit {
    @Input() provision: ProvisionVersion = ProvisionCreator.getEmptyProvision();

    fileToDownloadUrl?: string;

    ngOnInit() {
        if (!this.provision.fields.fileMetadata?.name)
            return;

        let settings = new ApiSettings();
        this.fileToDownloadUrl = `${settings.baseUrl}/file/${this.provision.id}`;
    }
}
