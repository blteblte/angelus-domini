import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/models/_AppState';
import { GapiService } from '../gapi/gapi-client.service';

@Injectable()
export class YoutubeVideosService {

  constructor(
    private ngRedux: NgRedux<IAppState>
    , private gapiService: GapiService
  ) { }

  ensureVideosLoaded() {
    const { youtubeVideos } = this.ngRedux.getState()
    if (!youtubeVideos) {
      this.gapiService.loadVideos()
    }
  }

}
