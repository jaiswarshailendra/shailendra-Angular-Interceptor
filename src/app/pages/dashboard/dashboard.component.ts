import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private api:ApiService,private router:Router){}
  ticket() {
    this.api.post('ticket/list_tickets/', null).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status === 200) {
          console.log('Ticket fetched successfully');
        } else {
          console.log('Failed to fetch ticket', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching ticket:', error);
      }
    });
  }

  dropdown(){
    console.log('Dropdown')
  }
}
