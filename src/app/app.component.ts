import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IImage, GalleryService } from './shared/models/gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public images$: Observable<IImage[]>;

  constructor (
    private galleryService: GalleryService
  ) {}

  public ngOnInit(): void {
    this.images$ = this.galleryService.fetchImages();

    this.galleryService.searchTerm$
      .subscribe(data => {
        if (data) {
          this.images$ = this.galleryService.fetchImagesByTerm(data);
        }
      });
  }
}
