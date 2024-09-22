import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { ILeague } from '../../../core/models/league.interface';
import { IMode } from '../../../core/models/mode.interface';

import { IMiscSettings, IPatchMiscSettings } from '../models/misc-settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private homePlayersLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private homeTeamsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private leaguesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private miscSettingsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private modesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public homePlayersLoading$: Observable<boolean> = this.homePlayersLoadingSubject.asObservable();
  public homeTeamsLoading$: Observable<boolean> = this.homeTeamsLoadingSubject.asObservable();
  public leaguesLoading$: Observable<boolean> = this.leaguesLoadingSubject.asObservable();
  public miscSettingsLoading$: Observable<boolean> = this.miscSettingsLoadingSubject.asObservable();
  public modesLoading$: Observable<boolean> = this.modesLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  createLeague(name: string): Observable<ILeague> {
    return this.httpClient.post<ILeague>('league', { name });
  }

  createMode(name: string): Observable<IMode> {
    return this.httpClient.post<IMode>('mode', { name });
  }

  deleteLeague(leagueId: number): Observable<ILeague> {
    return this.httpClient.delete<ILeague>(`league/${leagueId}`);
  }

  deleteMode(modeId: number): Observable<IMode> {
    return this.httpClient.delete<IMode>(`mode/${modeId}`);
  }

  getLeagues(): Observable<ILeague[]> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.get<ILeague[]>('league').pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  getMiscSettings(): Observable<IMiscSettings> {
    this.miscSettingsLoadingSubject.next(true);

    return this.httpClient.get<IMiscSettings>('settings').pipe(finalize(() => this.miscSettingsLoadingSubject.next(false)));
  }

  getModes(): Observable<IMode[]> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.get<IMode[]>('mode').pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  patchLeague(league: ILeague): Observable<ILeague> {
    return this.httpClient.patch<ILeague>(`league/${league.id}`, league);
  }

  patchMiscSettings(mode: IPatchMiscSettings): Observable<IMiscSettings> {
    return this.httpClient.patch<IMiscSettings>('settings', mode);
  }

  patchMode(mode: IMode): Observable<IMode> {
    return this.httpClient.patch<IMode>(`mode/${mode.id}`, mode);
  }

  reorderLeagues(leagues: ILeague[]): Observable<ILeague[]> {
    return this.httpClient.patch<ILeague[]>('league', leagues);
  }

  reorderModes(modes: IMode[]): Observable<IMode[]> {
    return this.httpClient.patch<IMode[]>('mode', modes);
  }
}
