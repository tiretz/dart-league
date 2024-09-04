import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authSerivce: AuthService = inject(AuthService);

  if (authSerivce.keycloak?.isTokenExpired()) {
    authSerivce.keycloak?.logout({ redirectUri: state.url });
    return false;
  }

  if (!authSerivce.keycloak?.hasResourceRole('user', 'dart-league-frontend')) {
    authSerivce.keycloak?.logout({ redirectUri: window.location.origin + state.url });
    return false;
  }

  return true;
};
