import { MatSort } from '@angular/material/sort';

import { MatTableSortingCacheDirective } from './mat-table-sorting-cache.directive';
import { inject } from '@angular/core';

describe('MatTableSortingCacheDirective', () => {
  it('should create an instance', () => {
    const ms: MatSort = inject(MatSort);

    const directive = new MatTableSortingCacheDirective(ms);
    expect(directive).toBeTruthy();
  });
});
