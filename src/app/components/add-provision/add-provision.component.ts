import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProvisionCreator, ProvisionVersion, ProvisionVersionFields} from "../../models/provision-version";
import {ProvisionsApiService} from "../../services/provisions-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProvisionHeader, ProvisionHeaderFields} from "../../models/provision-header";
import {EditModeEnum} from "../../models/edit-mode-enum";
import {ActivatedRoute, Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {FileService} from "../../services/file.service";
import {ApiSettings} from "../../api/api-settings";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {CONTENT_TYPES, ISSUERS} from "../../constants/constants";
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-add-provision',
  templateUrl: './add-provision.component.html',
  styleUrls: ['./add-provision.component.css']
})
export class AddProvisionComponent implements OnInit {
    @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
    file?: File;

    provisionVersion?: ProvisionVersion;
    provisionFields: ProvisionVersionFields = ProvisionCreator.getEmptyFields();
    provisionHeader?: ProvisionHeader;
    editMode: EditModeEnum = EditModeEnum.Create;
    keywords: string = '';
    issueDate?: Date;
    availableTypes: string[] = CONTENT_TYPES;
    issuers: string[] = ISSUERS;
    issuer: string = this.issuers[0];

    saving: boolean = false;
    close: boolean = false;

    fullVersionHref: string = '';

    constructor(private provisionsApi: ProvisionsApiService,
                private snackBar: MatSnackBar,
                private route: ActivatedRoute,
                private fileService: FileService,
                private router: Router,
                private errorHandler: ErrorHandlerService,
                private readonly adapter: DateAdapter<Date>) {
    }

    async ngOnInit(): Promise<void> {
        this.adapter.setLocale('cs-CZ');

        let provisionId = this.route.snapshot.paramMap.get('provisionId');
        if (provisionId) {
            let provisionGuid = Guid.parse(provisionId);
            await this.getProvisionHeader(provisionGuid);
        }

        let provisionVersionId = this.route.snapshot.paramMap.get('provisionVersionId');
        if (!provisionVersionId)
            return;

        let provisionVersionGuid = Guid.parse(provisionVersionId);
        await this.getProvisionVersion(provisionVersionGuid);

        const settings = new ApiSettings();
        this.fullVersionHref = `${settings.baseUrl}/file/${provisionVersionId}`;
    }

    async saveProvision(close: boolean): Promise<void> {
        if (!this.issueDate) {
            this.errorHandler.showError('Datum schválení není vyplněno.');

            return;
        }

        this.saving = true;
        this.close = close;

        let versionId: Guid | null = null;

        try {
            switch (this.editMode) {
                case EditModeEnum.Create:
                    versionId = await this.createNewProvision();
                    break;
                case EditModeEnum.NewVersion:
                    await this.addNewVersion();
                    break;
                case EditModeEnum.UpdateVersion:
                    await this.updateVersion();
                    break;
            }

            if (close)
                await this.router.navigateByUrl('/provision-list');

            this.snackBar.open('Předpis byl úspěšně uložen', 'Close', {
                duration: 3000
            });

            if (!close && this.editMode === EditModeEnum.Create && versionId)
                await this.router.navigateByUrl(`/update-provision-version/${versionId.toString()}`);
        }
        finally {
            this.saving = false;
        }

        return Promise.resolve();
    }

    private async createNewProvision(): Promise<Guid | null> {
        let provisionHeaderFields: ProvisionHeaderFields = {
            title: this.provisionFields.content.title,
            issuer: this.issuer,
            keywords: this.keywords.split(', ')
        };

        if (!this.issueDate) {
            this.snackBar.open('Datum schválení musí být vyplněn', 'Close');
            return null;
        }

        this.provisionFields.issueDate = this.issueDate;

        return new Promise((resolve) => {
            this.provisionsApi.addProvision(provisionHeaderFields)
                .subscribe(headerId => {
                    this.provisionFields.provisionHeader = headerId;
                    this.provisionHeader = {
                        id: headerId,
                        fields: provisionHeaderFields
                    }
                    this.addProvisionVersion().then(versionId => resolve(versionId));
                });
        });
    }

    private async addNewVersion(): Promise<Guid | null> {
        if (!this.issueDate) {
            this.snackBar.open('Datum schválení musí být vyplněno', 'Close');
            return null;
        }

        if (!this.provisionHeader?.id) {
            throw new Error('ID předpisu není definován');
        }

        this.provisionFields.provisionHeader = this.provisionHeader?.id;
        this.provisionFields.issueDate = this.issueDate;

        await this.updateHeader()

        let versionId = await this.addProvisionVersion();

        this.provisionHeader.fields.keywords = this.keywords.split(', ');

        return Promise.resolve(versionId);
    }

    private async updateVersion(): Promise<void> {
        if (!this.issueDate) {
            this.snackBar.open('Datum schválení musí být vyplněno', 'Close');
            return Promise.resolve();
        }

        this.provisionFields.issueDate = this.issueDate;

        if (!this.provisionVersion?.id)
            throw new Error('Provision version ID is empty.');

        await this.updateHeader();

        return new Promise((resolve) => {
            this.provisionsApi.updateVersion(this.provisionVersion!.id, this.provisionFields)
                .subscribe(_ => {
                    if (this.file) {
                        this.fileService.uploadFile(this.provisionVersion!.id, this.file).subscribe(_ =>
                            resolve()
                        );
                    }
                    else {
                        resolve()
                    }
                });
        });
    }

    private async addProvisionVersion(): Promise<Guid> {
        await this.updateHeader();

        return new Promise<Guid>((resolve) => {
            this.provisionsApi.addProvisionVersion(this.provisionFields)
                .subscribe(versionId => {
                    this.provisionVersion = {
                        id: versionId,
                        fields: this.provisionFields
                    }
                    if (this.file) {
                        this.fileService.uploadFile(versionId, this.file).subscribe(_ =>
                            resolve(versionId)
                        );
                    }
                    else {
                        resolve(versionId);
                    }
                });
        })
    }

    private updateHeader(): Promise<void> {
        if (!this.provisionHeader)
            return Promise.resolve();

        this.provisionHeader.fields.keywords = this.keywords.split(', ');
        this.provisionHeader.fields.issuer = this.issuer;
        this.provisionHeader.fields.title = this.provisionFields.content.title;

        return new Promise((resolve) => {
            this.provisionsApi.updateHeader(this.provisionHeader!.id, this.provisionHeader!.fields)
                .subscribe(_ => resolve());
        });
    }

    private async getProvisionHeader(provisionId: Guid): Promise<void> {
        await this.getHeader(provisionId);
        await this.getActualVersion(provisionId);

        this.editMode = EditModeEnum.NewVersion;
    }

    private async getHeader(provisionId: Guid): Promise<void> {
        return new Promise((resolve) => {
            this.provisionsApi.getProvisionHeader(provisionId)
                .subscribe(result => {
                    this.provisionHeader = result;
                    this.keywords = result.fields.keywords.join(', ');
                    this.issuer = result.fields.issuer;

                    resolve();
                });
        });
    }

    private async getActualVersion(provisionId: Guid): Promise<void> {
        return new Promise((resolve) => {
            this.provisionsApi.getActualProvision(provisionId)
                .subscribe(result => {
                    this.provisionFields = result.fields;

                    resolve();
                });
        });
    }

    private async getProvisionVersion(provisionVersionId: Guid): Promise<void> {
        this.editMode = EditModeEnum.UpdateVersion;

        return new Promise((resolve) => {
            this.provisionsApi.getProvisionVersionById(provisionVersionId).subscribe(result => {
                this.provisionVersion = result;
                this.provisionFields = result.fields;
                this.issueDate = result.fields.issueDate;

                if (!this.provisionHeader) {
                    this.provisionsApi.getProvisionHeader(result.fields.provisionHeader)
                        .subscribe(headerResult => {
                            this.provisionHeader = headerResult;
                            this.keywords = headerResult.fields.keywords.join(', ');

                            resolve();
                        });
                }
                else
                    resolve();
            });
        });
    }

    correctDate(date?: Date): Date | undefined {
        if (!date)
            return undefined;

        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    onFileSelected(event: any) {
        this.file = event.target.files[0];
    }
}
