import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { ILeague } from '../../../core/models/league.interface';
import { IMode } from '../../../core/models/mode.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private homePlayersLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private homeTeamsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private leaguesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private miscLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public homePlayersLoading$: Observable<boolean> = this.homePlayersLoadingSubject.asObservable();
  public homeTeamsLoading$: Observable<boolean> = this.homeTeamsLoadingSubject.asObservable();
  public leaguesLoading$: Observable<boolean> = this.leaguesLoadingSubject.asObservable();
  public miscLoading$: Observable<boolean> = this.miscLoadingSubject.asObservable();
  public modesLoading$: Observable<boolean> = this.modesLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getLeagues(): Observable<ILeague[]> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.get<ILeague[]>('league').pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  getModes(): Observable<IMode[]> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.get<IMode[]>('mode').pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  postLeagues(league: string): Observable<ILeague> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.post<ILeague>('league', league).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  patchLeagues(league: ILeague): Observable<ILeague> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.patch<ILeague>('league', league).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }
}
