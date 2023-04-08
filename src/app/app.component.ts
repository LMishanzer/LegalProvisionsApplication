import {Component} from '@angular/core';
import {Guid} from "guid-typescript";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'LegalProvisionsApplication';

    isSidebarOpened: boolean = false;

    provisionId = Guid.parse('b7ceff33-5591-4dfd-92b3-5e596a1983c2');
    firstDate = new Date('2022-04-08');
    secondDate = new Date('2023-04-08');
}
