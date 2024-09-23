import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { IMiscSettings, IPatchMiscSettings } from '../models/misc-settings.interface';

@Injectable({
  providedIn: 'root',
})
export class MiscSettingsService {
  private miscSettingsLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public miscSettingsLoading$: Observable<boolean> = this.miscSettingsLoadingSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getMiscSettings(): Observable<IMiscSettings> {
    this.miscSettingsLoadingSubject.next(true);

    return this.httpClient.get<IMiscSettings>('settings').pipe(finalize(() => this.miscSettingsLoadingSubject.next(false)));
  }

  patchMiscSettings(mode: IPatchMiscSettings): Observable<IMiscSettings> {
    return this.httpClient.patch<IMiscSettings>('settings', mode);
  }
}
