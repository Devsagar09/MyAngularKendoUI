import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private apiService: ApiServiceService) {
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
      this.resetUserData();
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
}
