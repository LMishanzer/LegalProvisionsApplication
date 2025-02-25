import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LegalProvisionComponent } from './components/legal-provision/legal-provision.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ProvisionContentComponent } from './components/provision-content/provision-content.component';
import { ProvisionSidebarComponent } from './components/provision-sidebar/provision-sidebar.component';
import {MatCardModule} from "@angular/material/card";
import { ProvisionMenuComponent } from './components/provision-menu/provision-menu.component';
import { AddProvisionComponent } from './components/add-provision/add-provision.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatInputModule} from "@angular/material/input";
import { AddProvisionContentComponent } from './components/add-provision-content/add-provision-content.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';
import { ProvisionListComponent } from './components/provision-list/provision-list.component';
import { VersionsListComponent } from './components/versions-list/versions-list.component';
import { ProvisionComparisonComponent } from './components/provision-comparison/provision-comparison.component';
import { ComparisonItemOldComponent } from './components/comparison-item-old/comparison-item-old.component';
import { ComparisonItemNewComponent } from './components/comparison-item-new/comparison-item-new.component';
import {MatSelectModule} from "@angular/material/select";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddReferenceDialogComponent } from './components/add-reference-dialog/add-reference-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { ReferenceDialogComponent } from './components/provision-content/reference-dialog/reference-dialog.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import {ErrorIntercept} from "./interceptors/error-intercept";

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        LegalProvisionComponent,
        ProvisionContentComponent,
        ProvisionSidebarComponent,
        ProvisionMenuComponent,
        AddProvisionComponent,
        ToolbarComponent,
        AddProvisionContentComponent,
        FooterComponent,
        ProvisionListComponent,
        VersionsListComponent,
        ProvisionComparisonComponent,
        ComparisonItemOldComponent,
        ComparisonItemNewComponent,
        ConfirmationDialogComponent,
        AddReferenceDialogComponent,
        SearchComponent,
        ReferenceDialogComponent,
        ErrorBoxComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
        MatSelectModule,
        CdkDropList,
        CdkDrag,
        MatDatepickerModule,
        MatNativeDateModule,
        CdkDragHandle,
        MatDialogModule,
        MatTreeModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorIntercept,
            multi: true
        },
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
