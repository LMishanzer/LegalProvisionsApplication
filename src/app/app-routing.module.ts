import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProvisionListComponent} from "./components/provision-list/provision-list.component";
import {ProvisionSidebarComponent} from "./components/provision-sidebar/provision-sidebar.component";
import {ProvisionComparisonComponent} from "./components/provision-comparison/provision-comparison.component";

const routes: Routes = [
    {path: 'provision-list', component: ProvisionListComponent},
    {path: 'provision/:provisionId', component: ProvisionSidebarComponent},
    {path: '', redirectTo: '/provision-list', pathMatch: 'full'},
    {path: 'comparison', component: ProvisionComparisonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
