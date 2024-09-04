import { HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authSerivce: AuthService = inject(AuthService);

  const token: string | undefined = authSerivce.keycloak?.token;

  if (token) {
    const authReq: HttpRequest<unknown> = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });

    return next(authReq);
  }

  return next(req);
};
