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

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let toastCtl: ToastController = new ToastController;

    return next.handle(req).pipe(
      retry(retryConfig),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        console.log(error);
        if(error.status == 400) {
          toastCtl.create({
            header: 'Error',
            message: error.error.error_message,
            animated: true,
            duration: 5000,
            color: 'danger',
            position: 'top',
          }).then((toast) => {
            toast.present();
          });
        }

        if (error.error instanceof ErrorEvent) {
          // client side error
          errorMessage = `Error: <${error.error.message}>`;
        } else {
          // server side error
          errorMessage = `Error status code: <${error.status}>, Error message: <${error.message}>`;
        }
        return throwError(() => errorMessage);
      }),
    );
  }
}
