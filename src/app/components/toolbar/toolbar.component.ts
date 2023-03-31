import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
    @Output() stateChanged = new EventEmitter<boolean>();

    openCloseSidebar() {
        this.stateChanged.emit();
    }
}
