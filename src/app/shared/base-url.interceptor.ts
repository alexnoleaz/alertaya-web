import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (/^https?:\/\//i.test(req.url)) return next(req);

  const apiUrl = environment.apiBaseUrl.replace(/\/$/, '');
  const relativeUrl = req.url.replace(/^\//, '');
  const fullUrl = `${apiUrl}/${relativeUrl}`;

  const modifiedReq = req.clone({ url: fullUrl });
  return next(modifiedReq);
};
