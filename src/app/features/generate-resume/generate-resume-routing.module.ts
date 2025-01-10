import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateResumeComponent } from './generate-resume/generate-resume.component';

const routes: Routes = [{ path: '', component: GenerateResumeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateResumeRoutingModule {}
