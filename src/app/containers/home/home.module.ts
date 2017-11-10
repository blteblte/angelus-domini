import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {

}
