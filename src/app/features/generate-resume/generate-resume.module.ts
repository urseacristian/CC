import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { GenerateResumeRoutingModule } from './generate-resume-routing.module';
import { GenerateResumeComponent } from './generate-resume/generate-resume.component';

@NgModule({
  declarations: [
    GenerateResumeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, 
    GenerateResumeRoutingModule,
    MatProgressBarModule
  ]
})
export class GenerateResumeModule { }
