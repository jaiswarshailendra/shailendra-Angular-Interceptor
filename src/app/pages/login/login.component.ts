import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import {  ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [ToastrService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage ="";
  loginobj={
    email:'',
    password:''
  }
  SinginDivVisible:boolean = false;
  constructor(private router:Router,private apiService:ApiService,private toastr:ToastrService,private authservice:AuthService){}

  Onlogin():void{
    this.apiService.post("auth/login/",this.loginobj,{ withCredentials: true }).subscribe({
      next: (response:any) => {
        console.log('Login successful:', response);
        if (response.status==200) {
          console.log(response);
        let users=this.authservice.getUsernameFromToken(response.token);
        console.log(users,"from login components");
        
        // Handle successful login (e.g., store token and navigate);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard'])}
        else {
             this.toastr.error(response.data);
        };
      },
      error: (error:any) => {
        this.toastr.error(error);
      }
    });
  }
}
