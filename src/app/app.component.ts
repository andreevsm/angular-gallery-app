import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  HostListener,
  OnDestroy
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { IImage, GalleryService } from './shared/models/gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  public page = 1;
  private subscription = new Subscription();

  get images$(): Observable<IImage[]> {
    return this.galleryService.images$;
  }

  constructor (
    private galleryService: GalleryService
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.galleryService.fetchImages(this.page).subscribe()
    );

    this.subscription.add(
      this.galleryService.searchTerm$
        .subscribe(searchTerm => {
          if (searchTerm) {
            this.page = 1;
            this.galleryService.fetchImagesByTerm(searchTerm, this.page).subscribe();
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    if (this.bottomReached()) {
      this.subscription.add(
        this.galleryService.searchTerm$
          .pipe(
            tap(() => this.page++),
            switchMap(searchTerm => searchTerm
              ? this.galleryService.fetchImagesByTerm(searchTerm, this.page)
              : this.galleryService.fetchImages(this.page)
            )
          )
          .subscribe()
      );
    }
  }

  public bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
