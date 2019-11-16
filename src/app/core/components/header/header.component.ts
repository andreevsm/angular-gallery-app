import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GalleryService } from '../../../shared/models/gallery';

@Component({
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  public searchForm: FormGroup;
  private subscription = new Subscription();

  constructor (
    private fb: FormBuilder,
    private galleryService: GalleryService
  ) {}

  public ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: []
    });

    this.subscription.add(
      this.searchForm.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(({ search }) => {
        this.galleryService.searchTerm$.next(search);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
