import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, noop, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router,private api:ApiService) {}
  
  getUsernameFromToken(token: string): string {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('decodedToken',decodedToken.username,jwtDecode(token))
      return decodedToken.username;  // Extract the username from the payload
    } catch (error) {
      console.error('Error decoding token', error);
      return "";
    }
  }
  // Method to refresh the access token
  refreshAccessToken() {
    console.log("Refreshing access token");
    const currentToken = localStorage.getItem('authToken');
    if (!currentToken) {
      console.error("No token available to refresh");
      this.logout();
      return of(null);
    }

    return this.api.post('auth/refresh_token/', {}, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    }).pipe(
      catchError((error) => {
        console.error("Failed to refresh access token", error);
        this.logout();
        return of(null);
      })
    );
  }

  // Store tokens after successful authentication
  storeTokens(tokens: { access: string; refresh: string }) {
    localStorage.setItem('authToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    console.log('refreshToken', tokens.refresh)
    this.isAuthenticated = true;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Check if token is present
  }

  // Log out the user
  logout(): void {
    this.isAuthenticated = false;
    this.api.post('auth/logout/',{},{withCredentials: true})
    localStorage.removeItem('authToken'); // Remove token from localStorage
    // this.router.navigate(['/login']); // Redirect to login
  }
}
