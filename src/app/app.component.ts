import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
  private endPageTitle = 'Daugavpils sv. Pētera ķēdēs baznīcas koris';
  // If no Title is provided, we'll use a default one before the dash(-)
  private defaultPageTitle = 'Angelus Domini';

  private routerSub$: Subscription;
  private allRouteSub$: Subscription;

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private title: Title,
      private meta: Meta,
      public translate: TranslateService
  ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('lv');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('lv');
  }

  ngOnInit() {
      // Change "Title" on every navigationEnd event
      // Titles come from the data.title property on all Routes (see app.routes.ts)
      this._changeTitleOnNavigation();
  }

  ngOnDestroy() {
      // Subscription clean-up
      this.routerSub$.unsubscribe();
      this.allRouteSub$.unsubscribe();
  }

  private _changeTitleOnNavigation() {

      this.routerSub$ = this.router.events
          .filter(event => event instanceof NavigationEnd)
          .map(() => this.activatedRoute)
          .map(route => {
              while (route.firstChild) route = route.firstChild;
              return route;
          })
          .filter(route => route.outlet === 'primary')
          .mergeMap(route => route.data)
          .subscribe((event) => {
              this._setMetaAndLinks(event);
          });

      this.allRouteSub$ = this.router.events
          .filter(event => event instanceof NavigationEnd)
          .subscribe((event) => {
            this.scrollToTop()
          })
  }

  private _setMetaAndLinks(event) {

      // Set Title if available, otherwise leave the default Title
      const title = event['title']
          ? `${event['title']} - ${this.endPageTitle}`
          : `${this.defaultPageTitle} - ${this.endPageTitle}`;

      this.title.setTitle(title);

      const metaData = event['meta'] || [];
      const linksData = event['links'] || [];

      for (let i = 0; i < metaData.length; i++) {
          this.meta.updateTag(metaData[i]);
      }
  }

  private scrollToTop() {
    if (window) {
      window.scrollTo(0, 0)
    }
  }
}
