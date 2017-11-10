import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

const notFoundRoutes: Routes = [
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '**', component: NotFoundComponent,
    data: {
        title: '404 - Not found',
        meta: [{ name: 'description', content: '404 - Error' }],
        links: [
            { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
            { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
        ]
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(notFoundRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotFoundRoutingModule { }
