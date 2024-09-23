import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { ICreateHomeTeam, IHomeTeam, IPatchHomeTeam } from '../models/home-team.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeTeamService {
  private homeTeamsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public homeTeamsLoading$: Observable<boolean> = this.homeTeamsLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  createHomeTeam(team: ICreateHomeTeam): Observable<IHomeTeam> {
    return this.httpClient.post<IHomeTeam>('team', team);
  }

  deleteHomeTeam(homeTeamId: number): Observable<IHomeTeam> {
    return this.httpClient.delete<IHomeTeam>(`team/${homeTeamId}`);
  }

  getHomeTeams(): Observable<IHomeTeam[]> {
    this.homeTeamsLoadingSubject.next(true);

    return this.httpClient.get<IHomeTeam[]>('team').pipe(finalize(() => this.homeTeamsLoadingSubject.next(false)));
  }

  patchHomeTeam(homeTeam: IPatchHomeTeam): Observable<IHomeTeam> {
    return this.httpClient.patch<IHomeTeam>(`team/${homeTeam.id}`, homeTeam);
  }
}
