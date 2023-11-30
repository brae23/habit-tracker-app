import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AddOptionsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            })
        let clonedReq = req.clone({ headers: headers, withCredentials: true });

        return next.handle(clonedReq);
    }
}