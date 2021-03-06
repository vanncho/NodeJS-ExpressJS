import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient) {
  }

  public get<T>(url: string, headers: object) {

    return this.http
      .get<T>(url, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  public post<T>(url: string, body: any, headers: object) {

    return this.http
      .post<T>(url, body, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  public put<T>(url: string, body: any, headers: object): Observable<Object> {

    return this.http
      .put<T>(url, body, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  public delete<T>(url: string, headers: object) {

    return this.http
      .delete<T>(url, headers)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: any): Observable<never> {

      return throwError(new Error(err));
  }
}
