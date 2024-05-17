import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, delay, finalize } from 'rxjs';

import { LoadingService } from '../../services/components/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.busy();
    return next.handle(request).pipe(
      delay(500),
      finalize(() => {
        this.loadingService.idle()
      })
    );
  }


}
