import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosComponent } from './videos.component';
import { MediaViewComponent } from '../../components/media-nav/media-view/media-view.component';

const videosRoutes: Routes = [
  {
    path: 'videos', component: VideosComponent,
    data: { title: 'Video' }
  },
  { path: 'videos/media/:type/:id/:selected', component: MediaViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(videosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class VideosRoutingModule { }
