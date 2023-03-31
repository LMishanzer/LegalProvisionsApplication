import { Component, Input } from '@angular/core';
import { ContentItem } from 'src/app/models/legal-provision-models';

@Component({
  selector: 'app-provision-content',
  templateUrl: './provision-content.component.html',
  styleUrls: ['./provision-content.component.css']
})
export class ProvisionContentComponent {
    @Input() content: ContentItem = {
        title: '',
        textMain: '',
        innerItems: []
    };

    @Input() order: number = 1;

}
