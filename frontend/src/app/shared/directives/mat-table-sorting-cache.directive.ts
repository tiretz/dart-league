import { Directive, Input, OnDestroy, OnInit } from '@angular/core';

import { MatSort, Sort, SortDirection } from '@angular/material/sort';

import { Subscription } from 'rxjs';

interface MatSortStoredData {
  active: string;
  direction: SortDirection;
}

@Directive({
  selector: '[appMatTableSortingCache]',
  standalone: true,
})
export class MatTableSortingCacheDirective implements OnDestroy, OnInit {
  @Input({ required: true })
  sortingCacheId!: string;

  get matSort(): MatSortStoredData {
    const storedSort: string | null = localStorage.getItem(this.storedSortPath);
    return storedSort ? JSON.parse(storedSort) : { active: '', direction: 'asc' };
  }

  set matSort(mat: MatSortStoredData) {
    localStorage.setItem(this.storedSortPath, JSON.stringify(mat));
  }

  private sortChangeSubscription?: Subscription;
  private storedSortPath!: string;

  constructor(private readonly ms: MatSort) {}

  ngOnDestroy(): void {
    this.sortChangeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.storedSortPath = window.location.pathname + '?' + this.sortingCacheId;

    if (this.matSort) {
      this.ms.active = this.matSort.active;
      this.ms.direction = this.matSort.direction;

      if (this.matSort.direction) {
        this.ms.sort({ disableClear: true, id: '', start: 'asc' });
        this.ms.sort({ disableClear: true, id: this.matSort.active, start: this.matSort.direction });
      }
    }

    this.sortChangeSubscription = this.ms.sortChange.subscribe((sort: Sort) => {
      this.matSort = {
        active: sort.active,
        direction: sort.direction,
      };
    });
  }
}
