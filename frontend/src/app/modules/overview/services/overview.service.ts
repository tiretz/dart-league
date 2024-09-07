import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private runningGamesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public runningGamesLoading$: Observable<boolean> = this.runningGamesLoadingSubject.asObservable();
}
