import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  title = 'Register User';
  posts: any[] = [];
  form: FormGroup; 

  constructor(private apiService: ApiServiceService,  private Notificationservice: NotificationService,private router:Router) {
    this.form = new FormGroup({
      fullName: new FormControl(this.user.username, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
      address: new FormControl(this.user.address, [Validators.required])
    });
  }
  
  user = {
    username: '',
    email: '',
    password: '',
    address: ''
  };

  createUser() {
    this.apiService.createUser(this.user).subscribe((data: any) => {
      console.log(data);
      this.posts.push(data);
      this.showNotification();
      this.router.navigate(['/getUser']);
    });
  }

  resetUserData() {
    this.user = {
      username: '',
      email: '',
      password: '',
      address: ''
    }
  }

  //Notification Service
  public showNotification(): void {
    this.Notificationservice.show({
      content: 'User Registered Successfully', 
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
