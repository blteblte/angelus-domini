import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MediaAlbum } from '../../../store/models/MediaAlbum';
import { YoutubeVideosService } from '../../../services/store/youtube-videos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getVidePublishedText } from '../../../shared/func/date-text';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  constructor(
      private youtubeVideosService: YoutubeVideosService
    , private router: Router
    , private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.youtubeVideosService.ensureVideosLoaded()
  }

  onVideoClick(album, video, event) {
    if (event.target.className.indexOf('youtube') > -1)
    {
      return
    }

    this.router.navigate(
        ['media/video', album.albumId, video.itemId]
      , { relativeTo: this.activatedRoute }
    )
  }

  getDateText(datePublished: string) {
    return getVidePublishedText(new Date(datePublished))
  }

  @select('youtubeVideos') mediaAlbums: Observable<MediaAlbum[]>
}
