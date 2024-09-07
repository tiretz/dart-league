import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  title$: Observable<string> = this.titleSubject.asObservable();

  updateTitle(title: string): void {
    this.titleSubject.next(title);
  }
}
