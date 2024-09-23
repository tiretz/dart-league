import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { ILeague } from '../../../core/models/league.interface';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  private leaguesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public leaguesLoading$: Observable<boolean> = this.leaguesLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  createLeague(name: string): Observable<ILeague> {
    return this.httpClient.post<ILeague>('league', { name });
  }

  deleteLeague(leagueId: number): Observable<ILeague> {
    return this.httpClient.delete<ILeague>(`league/${leagueId}`);
  }

  getLeagues(): Observable<ILeague[]> {
    this.leaguesLoadingSubject.next(true);

    return this.httpClient.get<ILeague[]>('league').pipe(finalize(() => this.leaguesLoadingSubject.next(false)));
  }

  patchLeague(league: ILeague): Observable<ILeague> {
    return this.httpClient.patch<ILeague>(`league/${league.id}`, league);
  }

  reorderLeagues(leagues: ILeague[]): Observable<ILeague[]> {
    return this.httpClient.patch<ILeague[]>('league', leagues);
  }
}
