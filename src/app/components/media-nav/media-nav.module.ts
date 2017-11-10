import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../../modules/angular-material.module';

import { AlbumGridComponent } from './album-grid/album-grid.component';
import { MediaGridComponent } from './media-grid/media-grid.component';
import { MediaViewComponent } from './media-view/media-view.component';
import { VideoListComponent } from './video-list/video-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  declarations: [
    AlbumGridComponent,
    MediaGridComponent,
    MediaViewComponent,
    VideoListComponent
  ],
  exports: [
    AlbumGridComponent,
    MediaGridComponent,
    MediaViewComponent,
    VideoListComponent
  ]
})
export class MediaNavModule { }
