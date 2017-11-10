import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../modules/angular-material.module';

import { MediaNavModule } from '../../components/media-nav/media-nav.module';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    VideosRoutingModule,
    MediaNavModule
  ],
  declarations: [
    VideosComponent
  ]
})
export class VideosModule {

}
