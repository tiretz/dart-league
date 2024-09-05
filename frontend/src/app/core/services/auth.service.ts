import { Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

import { ITokenUser } from '../models/token-user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _keycloak: Keycloak | undefined;
  private userSubject: BehaviorSubject<ITokenUser | undefined> = new BehaviorSubject<ITokenUser | undefined>(undefined);

  public user$: Observable<ITokenUser | undefined> = this.userSubject.asObservable();

  get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        clientId: 'dart-league-frontend',
        realm: 'dart-league',
        url: `${window.location.protocol}//${window.location.hostname}:4321`,
      });

      this._keycloak.onTokenExpired = () => {
        this._keycloak?.updateToken().catch((err) => {
          console.log(err);
          this.logout();
        });
      };
    }

    return this._keycloak;
  }

  get user(): ITokenUser | undefined {
    return this.userSubject.getValue();
  }

  async init() {
    const authenticated: boolean = await this.keycloak?.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      const tokenUser: ITokenUser | undefined = (await this.keycloak?.loadUserInfo()) as ITokenUser;
      tokenUser.token = this.keycloak?.token;

      this.userSubject.next(tokenUser);
    }
  }

  login(): Promise<void> {
    return this.keycloak?.login({ redirectUri: window.location.href });
  }

  logout(): Promise<void> {
    return this.keycloak?.logout({});
  }
}
