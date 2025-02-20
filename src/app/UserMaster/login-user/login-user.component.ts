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
        sessionStorage.setItem('userID',data.userid)
        sessionStorage.setItem('userName',data.username)
        const usernamevalue = data.username
        this.showNotification(`${usernamevalue} successfully Login`, 'success');
        this.router.navigate(['/getUser']);
        console.log("Login successfully"+data.userid)
        
      },
      error: (err) => {
        console.error(err);
        this.showNotification("Invalid Username or Password",'error')
      }
    });
  }
 

  //navigate to registerpage
  navigateToRegister(): void {
    console.log("Register User");
    this.router.navigate(['/registeruser']);
  }

    //wrong Notification
    public showNotification(message:string,type: 'success' | 'error' | 'info' | 'warning'): void {
      this.Notificationservice.show({
        content: message, 
        hideAfter: 1000,
        animation: { type: 'fade', duration: 500 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: type, icon: true },
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
