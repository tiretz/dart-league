import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';

import { apiInterceptor } from './core/interceptors/api.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth.service';

import { TemplatePageTitleStrategy } from './shared/strategies/template-page-title.strategy';

import { routes } from './app.routes';

function authFactory(authService: AuthService) {
  return () => authService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor, authInterceptor])),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    // { provide: APP_INITIALIZER, deps: [AuthService], useFactory: authFactory, multi: true },
  ],
};
