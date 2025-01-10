import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCvsRoutingModule } from './view-cvs-routing.module';
import { ViewCvsComponent } from './view-cvs.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ViewCvsComponent
  ],
  imports: [
    CommonModule,
    ViewCvsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class ViewCvsModule { }
