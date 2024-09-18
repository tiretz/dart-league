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

  createLeague(name: string): Observable<ILeague> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.post<ILeague>('league', { name }).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  createMode(name: string): Observable<IMode> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.post<IMode>('mode', { name }).pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  deleteLeague(leagueId: number): Observable<ILeague> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.delete<ILeague>(`league/${leagueId}`).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  deleteMode(modeId: number): Observable<IMode> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.delete<IMode>(`mode/${modeId}`).pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  editLeague(league: ILeague): Observable<ILeague> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.patch<ILeague>(`league/${league.id}`, league).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  editMode(mode: IMode): Observable<IMode> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.patch<IMode>(`mode/${mode.id}`, mode).pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  getLeagues(): Observable<ILeague[]> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.get<ILeague[]>('league').pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  getModes(): Observable<IMode[]> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.get<IMode[]>('mode').pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  reorderLeagues(leagues: ILeague[]): Observable<ILeague[]> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.patch<ILeague[]>('league', leagues).pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  reorderModes(modes: IMode[]): Observable<IMode[]> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.patch<IMode[]>('mode', modes).pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }
}
