import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/shared/models/gallery';

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
      this.searchForm.valueChanges.subscribe(({ search }) => {
        this.galleryService.searchTerm$.next(search);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
