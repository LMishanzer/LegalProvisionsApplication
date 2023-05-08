import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Injectable} from "@angular/core";
import {ErrorHandlerService} from "../services/error-handler.service";

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

    constructor(private errorHandler: ErrorHandlerService) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage;
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;

                        this.errorHandler.showError('Client-side error', errorMessage);

                    } else {
                        // server-side error
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;

                        this.errorHandler.showError('Server-side error', errorMessage);
                    }
                    console.log(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}
