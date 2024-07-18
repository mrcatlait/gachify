import { HttpInterceptorFn } from '@angular/common/http'

export const withCredentialsInterceptor: HttpInterceptorFn = (request, next) => {
  request = request.clone({
    withCredentials: true,
  })

  return next(request)
}
