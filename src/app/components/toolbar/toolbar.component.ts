import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
    @Input() isSidebarOpened: boolean = false;

    // openCloseSidebar() {
    //     this.isSidebarOpened = !this.isSidebarOpened;
    // }
}
