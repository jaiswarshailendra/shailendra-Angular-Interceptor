import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SessionExpiredDialogComponent } from './pages/session-expired-dialog/session-expired-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mainUrl = 'https://apicrm.esarwa.com/'; // Base URL

  constructor(private http: HttpClient,private route:Router,private dialog:MatDialog) {}

  // Generic POST method
  post(endpoint: string, body: any,options:any={}): Observable<any> {
    const url = `${this.mainUrl}${endpoint}`;
    return this.http.post(url, body,  { ...this.getHeaders(), ...options }).pipe(
      catchError(this.handleError)
    );
  }

  // Generic GET method
  get(endpoint: string, params: any = {}): Observable<any> {
    const url = `${this.mainUrl}${endpoint}`;
    return this.http.get(url, { ...this.getHeaders(), params }).pipe(
      catchError(this.handleError)
    );
  }

  // Add headers if needed
  private getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    return { headers };
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(()=>(error.error.data));
  }
}
