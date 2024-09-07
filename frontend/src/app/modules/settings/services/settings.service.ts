import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private homePlayersLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private homeTeamsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private miscLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public homePlayersLoading$: Observable<boolean> = this.homePlayersLoadingSubject.asObservable();
  public homeTeamsLoading$: Observable<boolean> = this.homeTeamsLoadingSubject.asObservable();
  public miscLoading$: Observable<boolean> = this.miscLoadingSubject.asObservable();
}
