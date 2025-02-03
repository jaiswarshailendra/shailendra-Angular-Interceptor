import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionExpiredDialogComponent } from './pages/session-expired-dialog/session-expired-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private dialog: MatDialog, private router: Router) {}

  handleSessionExpiration() {
   // Don't show the dialog if the user is already on the login page
   if (this.router.url !== '/login') {
    const dialogRef = this.dialog.open(SessionExpiredDialogComponent, {
      disableClose: true, // Prevent closing without interaction
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']); // Redirect after the dialog is closed
    });
  }
  }
}