import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,

    data: {
        title: 'Angelus Domini',
        meta: [{ name: 'description', content: 'Daugavpils sv. Pētera ķēdēs baznīcas koris Angelus Domini' }],
        links: [
            { rel: 'canonical', href: 'http://blogs.example.com/blah/nice' },
            { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/' }
        ]
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
