import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { HomeModule } from './containers/home/home.module';
import { ContactsModule } from './containers/contacts/contacts.module';
import { GaleryModule } from './containers/galery/galery.module';
import { VideosModule } from './containers/videos/videos.module';
import { NotFoundModule } from './containers/not-found/not-found.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClient } from '@angular/common/http';
import { IAppState } from './store/models/_AppState';
import { appReducer } from './store/app.reducer';
import { initialState } from './store/initial-state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeVideosService } from './services/store/youtube-videos.service';
import { GapiService } from './services/gapi/gapi-client.service';
import { PlatformService } from './services/platform/platform.service';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `/assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgReduxModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      []
      , {
        // Router options
        useHash: false,
        // preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled'
    }),

    AngularMaterialModule,
    /* modules with routes */
    HomeModule,
    ContactsModule,
    GaleryModule,
    VideosModule,
    /* must be last route declaration */
    NotFoundModule
  ],
  providers: [
    HttpClient,
    YoutubeVideosService,
    GapiService,
    PlatformService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>
  , private devTools: DevToolsExtension
) {
  let enchancers = [];

  if (isDevMode() && this.devTools.isEnabled()) {
    const devToolsOptions = {
      name: 'AngelusDomini',
      actionsBlacklist: []
    }
    enchancers = [ ...enchancers, this.devTools.enhancer(devToolsOptions) ];
  }

  this.ngRedux.configureStore(
    /* root reducer */
    appReducer,
    /* initial state */
    initialState,
    /* middlewares */
    [],
    /* enchancers */
    enchancers
  )

}
}
