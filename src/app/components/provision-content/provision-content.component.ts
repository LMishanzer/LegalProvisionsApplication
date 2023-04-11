import {Component, Input} from '@angular/core';
import {ProvisionCreator, ContentItem} from 'src/app/models/provision-version';
import {Router} from "@angular/router";

@Component({
  selector: 'app-provision-content',
  templateUrl: './provision-content.component.html',
  styleUrls: ['./provision-content.component.css']
})
export class ProvisionContentComponent {
    @Input() content: ContentItem = ProvisionCreator.getEmptyContent();

    constructor(private router: Router) {
    }

    goToProvision(provisionId: string): void {
        this.router.navigate([`/provision/${provisionId}`]).then(()=>{
            console.log(`After navigation I am on:${this.router.url}`)
        });
    }
}
