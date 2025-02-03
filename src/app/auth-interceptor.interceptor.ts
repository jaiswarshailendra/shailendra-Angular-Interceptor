import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { SessionService } from './session.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router); // Inject Router for navigation
  const sessionService= inject(SessionService)

  // Skip refreshing token for login and refresh token requests
  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh_token/')) {
    return next(req);
  }

  const accessToken = localStorage.getItem('authToken'); // Ensure consistency in localStorage key
  let modifiedReq = req.clone({
    withCredentials: true,
  });

  // If the AccessToken is present, add it to the request headers
  if (accessToken) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Continue to the next interceptor or handler
  return next(modifiedReq).pipe(
    catchError((error) => {
      // If the access token is expired (401 Unauthorized), try to refresh it
      if (error.status === 401 && !req.url.includes('/auth/refresh_token/')) {
        return authService.refreshAccessToken().pipe(
          switchMap((response: any) => {
            if (!response || !response.access_token) {
              sessionService.handleSessionExpiration();
              return throwError(() => new Error('Invalid refresh token response'));
            }
            
            // Save the new access token
            localStorage.setItem('authToken', response.access_token);
            
            // Clone the original request with the new token
            const refreshedReq = req.clone({
              withCredentials: true,
              setHeaders: {
                Authorization: `Bearer ${response.access_token}`,
              },
            });
            
            // Retry the original request with the new token
            return next(refreshedReq);
          }),
          catchError((refreshError) => {
            console.error('Token refresh failed:', refreshError);
            sessionService.handleSessionExpiration();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
