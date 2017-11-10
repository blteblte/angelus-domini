import { Component, Input, HostListener, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MediaAlbum } from '../../../store/models/MediaAlbum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IAppState } from '../../../store/models/_AppState';
import { YoutubeVideosService } from '../../../services/store/youtube-videos.service';

@Component({
  selector: 'app-media-grid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.scss']
})
export class MediaGridComponent implements OnInit {
  selectedAlbum: MediaAlbum
  albumId: string
  type: string
  // required 'number' for mg-grid
  // tslint:disable-next-line:no-inferrable-types
  columnCount: number = 0
  hasLoaded = false

  constructor(
      private activatedRoute: ActivatedRoute
    , private ngRedux: NgRedux<IAppState>
    , private router: Router
    , private youtubeVideosService: YoutubeVideosService
  ) { }

  ngOnInit(): void {
    this.setGridColumns()
    this.youtubeVideosService.ensureVideosLoaded()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.type = params['type']
      this.albumId = params['id']
    })

    this.ngRedux.select(this.getSelector()).subscribe((albums: MediaAlbum[]) => {
      this.selectedAlbum = albums.find(x => x.albumId === this.albumId)
      this.preloadImages()
    })
  }

  getSelector() {
    let selector = ''
    if (this.type.toLowerCase() === 'photo') {
      selector = 'mediaAlbums'
    }
    else if (this.type.toLowerCase() === 'video') {
      selector = 'youtubeVideos'
    }
    else {
      if (window) window.location.href = '/not-found'
    }
    return selector
  }

  preloadImages() {
    const loadingImages = this.selectedAlbum.data.map(item => {
      if (item.type === 'photo') {
        return new Promise((resolve) => {
          const image = new Image()
          image.onload = () => { resolve(image) }
          image.src = item.src
        })
      }
    })

    Promise.all(loadingImages).then((images) => {
      this.hasLoaded = true;
    })
  }

  setGridColumns() {
    const { innerWidth } = window
    let c = 3;

    if (innerWidth >= 1000) {
      c = 4
    }
    else if (innerWidth < 1000 && innerWidth >= 600) {
      c = 3
    }
    else if (innerWidth < 600) {
      c = 2
    }

    if (c !== this.columnCount) {
      this.columnCount = c
    }
  }

  @HostListener('window:resize', ['$event'])
  onResolutionChange(event) {
    this.setGridColumns()
  }
}
