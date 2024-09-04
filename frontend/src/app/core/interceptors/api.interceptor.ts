import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq: HttpRequest<unknown> = req.clone({ url: `${window.location.protocol}//${window.location.hostname}:8000/api/${req.url}` });
  return next(apiReq);
};
