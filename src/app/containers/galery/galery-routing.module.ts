import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GaleryComponent } from './galery.component';
import { MediaGridComponent } from '../../components/media-nav/media-grid/media-grid.component';
import { MediaViewComponent } from '../../components/media-nav/media-view/media-view.component';

const galeryRoutes: Routes = [
  {
    path: 'galery', component: GaleryComponent,
    data: { title: 'Foto Galerija' }
  },
  { path: 'galery/media/:type/:id', component: MediaGridComponent },
  { path: 'galery/media/:type/:id/:selected', component: MediaViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(galeryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GaleryRoutingModule { }
