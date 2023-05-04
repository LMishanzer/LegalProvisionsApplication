import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {SearchResult} from "../../models/search-result";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchTerm: string = '';
    resultList: SearchResult[] = [];

    constructor(private searchService: SearchService) {
    }

    search() {
        if (this.searchTerm.length === 0) {
            return;
        }

        this.searchService.search(this.searchTerm).subscribe(response => {
            this.resultList = response;
        });
    }
}
