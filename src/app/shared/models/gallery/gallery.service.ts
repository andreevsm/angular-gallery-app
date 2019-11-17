import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IImage, ISearchImageData } from './gallery.interface';

@Injectable({ providedIn: 'root' })
export class GalleryService {

  public searchTerm$ = new BehaviorSubject<string>('');
  public images$ = new BehaviorSubject<IImage[]>([]);

  constructor (
    private http: HttpClient
  ) {}

  public fetchImages(page: number): Observable<IImage[]> {
    return this.http.get<IImage[]>(`/photos?page=${page}&per_page=16`)
      .pipe(
        tap((images: IImage[]) => this.images$.next([
          ...this.images$.value,
          ...images
        ]))
      );
  }

  public fetchImagesByTerm(query: string, page: number): Observable<ISearchImageData> {
    return this.http.get<ISearchImageData>(`/search/photos?page=${page}&per_page=16`, {
      params: { query }
    }).pipe(
      tap(({ results }) => {
        const oldImages = page === 1 ? [] : this.images$.value;
        this.images$.next([
          ...oldImages,
          ...results
        ]);
      })
    );
  }
}
