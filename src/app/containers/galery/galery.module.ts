import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaleryComponent } from './galery.component';
import { GaleryRoutingModule } from './galery-routing.module';
import { AngularMaterialModule } from '../../modules/angular-material.module';

import { MediaNavModule } from '../../components/media-nav/media-nav.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    GaleryRoutingModule,
    MediaNavModule
  ],
  declarations: [
    GaleryComponent
  ]
})
export class GaleryModule {

}
