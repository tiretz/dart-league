import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { ICreateHomePlayer, IHomePlayer, IPatchHomePlayer } from '../models/home-player.interface';

@Injectable({
  providedIn: 'root',
})
export class HomePlayerService {
  private homePlayersLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public homePlayersLoading$: Observable<boolean> = this.homePlayersLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  createHomePlayer(homePlayer: ICreateHomePlayer): Observable<IHomePlayer> {
    return this.httpClient.post<IHomePlayer>('player', homePlayer);
  }

  deleteHomePlayer(homePlayerId: number): Observable<IHomePlayer> {
    return this.httpClient.delete<IHomePlayer>(`player/${homePlayerId}`);
  }

  getHomePlayers(): Observable<IHomePlayer[]> {
    this.homePlayersLoadingSubject.next(true);

    return this.httpClient.get<IHomePlayer[]>('player').pipe(finalize(() => this.homePlayersLoadingSubject.next(false)));
  }

  patchHomePlayer(homePlayer: IPatchHomePlayer): Observable<IHomePlayer> {
    return this.httpClient.patch<IHomePlayer>(`player/${homePlayer.id}`, homePlayer);
  }
}
