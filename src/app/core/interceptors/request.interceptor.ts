import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  req = req.clone({
    setHeaders: {authorId: '500'}
  });

  return next(req);
};
