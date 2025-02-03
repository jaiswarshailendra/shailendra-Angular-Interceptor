import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired-dialog',
  standalone: true,
  imports: [],
  templateUrl: './session-expired-dialog.component.html',
  styleUrl: './session-expired-dialog.component.css'
})
export class SessionExpiredDialogComponent {
  constructor(private dialogRef:MatDialogRef<SessionExpiredDialogComponent>){}
  closeDialog(){
    this.dialogRef.close();
  }

}
