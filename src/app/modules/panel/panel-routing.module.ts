import {RouterModule, Routes} from "@angular/router";
import {PanelComponent} from "./panel/panel.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '', component: PanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
