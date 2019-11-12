import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IImage } from './gallery.interface';

@Injectable({ providedIn: 'root' })
export class GalleryService {

  public searchTerm$ = new BehaviorSubject<string>('');

  constructor (
    private http: HttpClient
  ) {}

  public fetchImages(): Observable<IImage[]> {
    return <any>this.http.get('https://api.unsplash.com/photos', {
      headers: {
        'Authorization': 'Client-ID 2a0a414444af0cd13129b44ce8742480b93c3fad1214d5600abdb2c221aac2cb'
      }
    });
  }

  public fetchImagesByTerm(searchTerm: string): Observable<IImage[]> {
    return <any>this.http.get('https://api.unsplash.com/search/photos', {
      headers: {
        'Authorization': 'Client-ID 2a0a414444af0cd13129b44ce8742480b93c3fad1214d5600abdb2c221aac2cb'
      },
      params: {
        query: searchTerm
      }
    }).pipe(
      map(({ results }) => results)
    );
  }
}
