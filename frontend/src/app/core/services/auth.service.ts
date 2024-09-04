import { Injectable } from '@angular/core';

import Keycloak from 'keycloak-js';

import { ITokenUser } from '../models/token-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _keycloak: Keycloak | undefined;
  private _user: ITokenUser | undefined;

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
    return this._user;
  }

  async init() {
    const authenticated: boolean = await this.keycloak?.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._user = (await this.keycloak?.loadUserInfo()) as ITokenUser;
      this._user.token = this.keycloak?.token;
    }
  }

  logout(): Promise<void> {
    return this.keycloak?.logout({});
  }
}
