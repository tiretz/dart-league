import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { IMode } from '../../../core/models/mode.interface';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private modesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public modesLoading$: Observable<boolean> = this.modesLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  createMode(name: string): Observable<IMode> {
    return this.httpClient.post<IMode>('mode', { name });
  }

  deleteMode(modeId: number): Observable<IMode> {
    return this.httpClient.delete<IMode>(`mode/${modeId}`);
  }

  getModes(): Observable<IMode[]> {
    this.modesLoadingSubject.next(true);

    return this.httpClient.get<IMode[]>('mode').pipe(finalize(() => this.modesLoadingSubject.next(false)));
  }

  patchMode(mode: IMode): Observable<IMode> {
    return this.httpClient.patch<IMode>(`mode/${mode.id}`, mode);
  }

  reorderModes(modes: IMode[]): Observable<IMode[]> {
    return this.httpClient.patch<IMode[]>('mode', modes);
  }
}
