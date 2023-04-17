import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ProvisionHeader} from "../../models/provision-header";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchTerm: string = '';
    provisionList: ProvisionHeader[] = [];

    constructor(private searchService: SearchService) {
    }

    search() {
        if (this.searchTerm.length === 0) {
            throw new Error('Search term cannot be empty.');
        }

        this.searchService.search(this.searchTerm).subscribe(response => {
            this.provisionList = response;
        });
    }
}
