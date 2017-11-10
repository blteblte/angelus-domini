import { Injectable } from '@angular/core';
import { PlatformService } from '../platform/platform.service';
import { Observable } from 'rxjs/Observable';
import { GapiChannelsResponse } from '../../store/models/GapiChannelsResponse';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/models/_AppState';
import { MediaAlbum } from '../../store/models/MediaAlbum';
import { GapiSearchResponse } from '../../store/models/GapiSearchResponse';
import { GapiVideosResponse } from '../../store/models/GapiVideosResponse';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GapiService {

  constructor(
      private platformService: PlatformService
    , private httpClient: HttpClient
    , private ngRedux: NgRedux<IAppState>
  ) { }

  private getUrl(endpoint: string, params: string) {
    const API_KEY = 'AIzaSyCFxZuzNM9dQI2FdXkgdmwnntfnCz3vGso'
    const version = 'v3'
    return `https://www.googleapis.com/youtube/${version}/${endpoint}?key=${API_KEY}${params}`
  }

  // public loadVideos(): void {
  //   const id = 'UCJQY2-J20k3WBrJwdK2dwhQ'
  //   const parts =  'snippet,contentDetails,statistics'
  //   const url = this.getUrl('channels', `&part=${parts}&id=${id}`)
  //   this.transferHttp.get(url).subscribe((response: GapiChannelsResponse) => {
  //     console.log(response)

  //     const youtubeVideos: MediaAlbum[] = []
  //     const album: MediaAlbum = { name: '', description: '', albumId: 'angelus-domini', data: [] }
  //     const videoIds: string[] = []
  //     response.items.forEach((item) => { videoIds.push(item.etag) })

  //     const videoParts = 'fileDetails'
  //     const videosUrl = this.getUrl('videos', `&part=${videoParts}&id=${videoIds.join(',')}`)
  //     this.transferHttp.get(videosUrl).subscribe((videosResponse) => {
  //       console.log(videosResponse)
  //     })

  //     youtubeVideos.push(album)
  //     this.ngRedux.dispatch({ type: 'YOUTUBE_VIDEOS_LOADED', payload: youtubeVideos })
  //   })
  // }

  public loadVideos(): void {
    const channelId = 'UCIiJ33El2EakaXBzvelc2bQ'
    const type = 'video'
    const part = 'id'

    const searchUrl = this.getUrl('search', `&part=${part}&channelId=${channelId}&type=${type}`)

    /* get video ids for the channel */
    this.httpClient.get(searchUrl).subscribe((searchResponse: GapiSearchResponse) => {
      const videoIds = searchResponse.items.map((item) => item.id.videoId)
      const videoParts = 'player,snippet'
      const videosUrl = this.getUrl('videos', `&part=${videoParts}&id=${videoIds.join(',')}`)

      /* get videos info */
      this.httpClient.get(videosUrl).subscribe((videosResponse: GapiVideosResponse) => {
        const youtubeVideos: MediaAlbum[] = []
        const album: MediaAlbum = {
            name: 'Angelus Domini'
          , description: 'Some channel description'
          , albumId: 'angelus-domini'
          , data: []
        }

        /* parse videos */
        videosResponse.items.forEach((videoItem) => {
          const regex = /<iframe.*?src=['"](.*?)['"]/;
          const src = regex.exec(videoItem.player.embedHtml)[1];
          album.data.push({
            src
            , type: 'video'
            , itemId: videoItem.id
            , thumbUrl: videoItem.snippet.thumbnails.high.url
            , description: videoItem.snippet.description
            , publishedAt: videoItem.snippet.publishedAt
            , title: videoItem.snippet.title
            , localizedTitle: videoItem.snippet.localized.title
            , localizedDescription: videoItem.snippet.localized.description
          })
        })
        album.data = album.data.sort((a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        youtubeVideos.push(album)
        this.ngRedux.dispatch({ type: 'LOAD_YOUTUBE_VIDEOS', payload: youtubeVideos })
      })
    })
  }

}
