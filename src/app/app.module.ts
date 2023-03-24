import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LegalProvisionComponent } from './components/legal-provision/legal-provision.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ProvisionContentComponent } from './components/provision-content/provision-content.component';
import { ProvisionSidebarComponent } from './components/provision-sidebar/provision-sidebar.component';
import {MatCardModule} from "@angular/material/card";
import { ProvisionMenuComponent } from './components/provision-menu/provision-menu.component';
import { ProvisionMenuItemComponent } from './components/provision-menu-item/provision-menu-item.component';

@NgModule({
    declarations: [
        AppComponent,
        LegalProvisionComponent,
        ProvisionContentComponent,
        ProvisionSidebarComponent,
        ProvisionMenuComponent,
        ProvisionMenuItemComponent
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
        MatCardModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
