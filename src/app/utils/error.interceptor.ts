import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, RetryConfig, TimeoutError, catchError, retry, retryWhen, throwError, timer } from "rxjs";

const retryConfig: RetryConfig = {
    count: 3,
    delay: (error: any, retryIndex: number) => {
        if (error instanceof TimeoutError) {
            const interval = 200;
            const delay = Math.pow(2, retryIndex - 1) * interval;
            return timer(delay);
        }
        throw error;
    }
}

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                retry(retryConfig),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';

                    if (error.error instanceof ErrorEvent) {
                        // client side error
                        errorMessage = `Error: <${error.error.message}>`;
                    } else {
                        // server side error
                        errorMessage = `Error status code: <${error.status}>, Error message: <${error.message}>`;
                    }
                    return throwError(() => errorMessage);
                })
            )
    }
}