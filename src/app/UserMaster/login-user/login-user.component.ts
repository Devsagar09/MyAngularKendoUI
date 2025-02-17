import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-login-user',
  standalone: false,
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {

  title = 'Login User';
  posts: any[] = [];
  
  user = {
    username: '',
    password: ''
  };

  constructor(private apiService:ApiServiceService,
    private router:Router, 
    private Notificationservice: NotificationService) { }

  loginUser() {
    this.apiService.loginuser(this.user).subscribe({
      next: (data: any) => { 
        this.posts.push(data);
        this.successNotification()
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.showNotification()
      }
    });
  }

  //navigate to registerpage
  navigateToRegister(): void {
    console.log("Register User");
    this.router.navigate(['/registeruser']);
  }

    //wrong Notification
    public showNotification(): void {
      this.Notificationservice.show({
        content: 'Username or Password is incorrect', 
        hideAfter: 1000,
        animation: { type: 'fade', duration: 500 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'error', icon: true },
        height: 50,
        width: 300 , 
        cssClass: ['.notification-font']
      });
    }

    //correct info
    public successNotification(): void {
      this.Notificationservice.show({
        content: 'Successfully Login', 
        hideAfter: 1000,
        animation: { type: 'fade', duration: 500 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'success', icon: true },
        height: 50,
        width: 300 , 
        cssClass: ['.notification-font']
      });
    }
 


}
