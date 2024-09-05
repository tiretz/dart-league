import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  private runningGamesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public runningGamesLoading$: Observable<boolean> = this.runningGamesLoadingSubject.asObservable();
}
