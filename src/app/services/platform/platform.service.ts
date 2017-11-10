
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import {
    isPlatformBrowser
  , isPlatformServer
  , isPlatformWorkerApp
  , isPlatformWorkerUi
} from '@angular/common';

@Injectable()
export class PlatformService {

  get isPlatformBrowser() {
    return isPlatformBrowser(this.platformId)
  }

  get isPlatformServer() {
    return isPlatformServer(this.platformId)
  }

  get isPlatformWorkerApp() {
    return isPlatformWorkerApp(this.platformId)
  }

  get isPlatformWorkerUi() {
    return isPlatformWorkerUi(this.platformId)
  }

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }
}
