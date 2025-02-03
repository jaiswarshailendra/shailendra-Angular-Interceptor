import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { authInterceptorInterceptor } from './auth-interceptor.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { MatDialogModule } from '@angular/material/dialog';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorInterceptor])),
    provideAnimationsAsync(),
    provideToastr(),
    importProvidersFrom(MatDialogModule),
    {
      provide:HTTP_INTERCEPTORS,
      useValue:authInterceptorInterceptor,
      multi:true
    },
    AuthGuard,
    AuthService,
    
  ],
};
