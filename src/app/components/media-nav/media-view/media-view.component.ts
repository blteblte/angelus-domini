import { Component, Input, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MediaAlbum } from '../../../store/models/MediaAlbum';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IAppState } from '../../../store/models/_AppState';
import { YoutubeVideosService } from '../../../services/store/youtube-videos.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESC = 27
}

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaViewComponent implements OnInit {
  type: string
  albumId: string
  selectedItemId: string
  selectedAlbum: MediaAlbum

  constructor(
      private sanitizer: DomSanitizer
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private ngRedux: NgRedux<IAppState>
    , private youtubeVideosService: YoutubeVideosService
  ) {
    // ...
  }

  ngOnInit() {
    this.youtubeVideosService.ensureVideosLoaded()

    this.activatedRoute.params.subscribe((params: Params) => {
      this.type = params['type']
      this.albumId = params['id']
      this.selectedItemId = params['selected']
    })

    this.ngRedux.select(this.getSelector()).subscribe((albums: MediaAlbum[]) => {
      if (!albums) { return }
      this.selectedAlbum = albums.find(x => x.albumId === this.albumId)
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

  getSelectedIndex() {
    return this.selectedAlbum.data.findIndex(x => x.itemId === this.selectedItemId)
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event) {

    if (!this.selectedAlbum) { return }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.showNextPhoto()
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.showPreviousPhoto()
    }

    if (event.keyCode === KEY_CODE.ESC) {
      this.backToAlbum()
    }
  }

  backToAlbum() {
    if (this.type.toLowerCase() === 'photo') {
      this.router.navigate(['../../', this.albumId], { relativeTo: this.activatedRoute })
    }
    else if (this.type.toLowerCase() === 'video') {
      this.router.navigateByUrl('/videos')
    }
  }

  showNextPhoto() {
    let nextIndex = this.getSelectedIndex()
    if (nextIndex === this.selectedAlbum.data.length - 1) {
      nextIndex = -1;
    }
    const nextItem = this.selectedAlbum.data[++nextIndex];
    if (nextItem) {
      this.router.navigate(['../', nextItem.itemId], { relativeTo: this.activatedRoute })
    }
  }

  showPreviousPhoto() {
    let nextIndex = this.getSelectedIndex()
    if (nextIndex === 0) {
      nextIndex = this.selectedAlbum.data.length;
    }
    const nextItem = this.selectedAlbum.data[--nextIndex];
    if (nextItem) {
      this.router.navigate(['../', nextItem.itemId], { relativeTo: this.activatedRoute })
    }
  }

  /* this approach removes unnecessary change detection which causes video flickering */
  sanitizedUrls = {}
  sanitizeUrl(url) {
    if (!this.sanitizedUrls[url]) {
      this.sanitizedUrls[url] = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
    return this.sanitizedUrls[url]
  }

}
