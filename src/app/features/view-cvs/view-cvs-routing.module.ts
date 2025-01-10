import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCvsComponent } from './view-cvs.component';

const routes: Routes = [{ path: '', component: ViewCvsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCvsRoutingModule { }
