import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ToastController, ToastOptions } from '@ionic/angular';
import {
  Observable,
  RetryConfig,
  TimeoutError,
  catchError,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

const retryConfig: RetryConfig = {
  count: 3,
  delay: (error: any, retryIndex: number) => {
    if (error instanceof TimeoutError) {
      const interval = 200;
      const delay = Math.pow(2, retryIndex - 1) * interval;
      return timer(delay);
    }
    throw error;
  },
};

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastCtl: ToastController,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      retry(retryConfig),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        console.log(error);
        if (error.status == 400) {
          this.toastCtl
            .create({
              header: 'Error',
              message: error.error.error_message,
              animated: true,
              duration: 5000,
              color: 'danger',
              position: 'top',
            })
            .then((toast) => {
              toast.present();
            });
        } else if (error.status == 401 && !error.url?.includes('/api/auth/login')) {
          this.toastCtl
            .create({
              header: 'Unauthorized',
              message: 'Please log in again.',
              animated: true,
              duration: 5000,
              color: 'danger',
              position: 'top',
            })
            .then((toast) => {
              this.authService.logout();
              toast.present();
            });
        } else if (error.status == 500) {
          this.toastCtl
            .create({
              header: 'Error',
              message: 'An unexpected error occurred. Please try again later.',
              animated: true,
              duration: 5000,
              color: 'danger',
              position: 'top',
            })
            .then((toast) => {
              toast.present();
            });
        }
        
        return throwError(() => error);
      }),
    );
  }
}
