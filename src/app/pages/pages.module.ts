import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './../shared/shared.module';

//components
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
