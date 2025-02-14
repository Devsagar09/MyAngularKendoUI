import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service'; 
import {Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  title = 'Register User';
  posts: any[] = [];

  constructor(private apiService: ApiServiceService) { }

  // ngOnInit() {
  //   this.apiService.getAllUser().subscribe((data: any[]) => {
  //     console.log(data);
  //     this.posts = data;
  //   })
  // }

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
