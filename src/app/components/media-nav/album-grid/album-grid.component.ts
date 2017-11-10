import { Component, Input, HostListener, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { MediaAlbum } from '../../../store/models/MediaAlbum';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-album-grid',
  templateUrl: './album-grid.component.html',
  styleUrls: ['./album-grid.component.scss']
})
export class AlbumGridComponent implements OnInit {
  @select('mediaAlbums') mediaAlbums: Observable<MediaAlbum[]>
  // required 'number' for mg-grid
  // tslint:disable-next-line:no-inferrable-types
  columnCount: number = 0
  hasLoaded = false

  ngOnInit(): void {
    this.setGridColumns()
    this.mediaAlbums.subscribe((albums) => {
      this.preloadImages(albums)
    })
  }

  setGridColumns() {
    const { innerWidth } = window
    let c = 3;

   if (innerWidth < 1000 && innerWidth >= 600) {
      c = 3
    }
    else if (innerWidth < 600) {
      c = 2
    }

    if (c !== this.columnCount) {
      this.columnCount = c
    }
  }

  preloadImages(albums: MediaAlbum[]) {
    const loadingImages = albums.map(item => {
      const v = item.data[0]
      if (v.type === 'photo') {
        return new Promise((resolve) => {
          const image = new Image()
          image.onload = () => { resolve(image) }
          image.src = v.src
        })
      }
    })

    Promise.all(loadingImages).then((images) => {
      this.hasLoaded = true;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResolutionChange(event) {
    this.setGridColumns()
  }
}
