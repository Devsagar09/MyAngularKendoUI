import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ApiServiceService } from './api-service.service';
import { GridModule } from '@progress/kendo-angular-grid';
//import FormsModule
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    LoginUserComponent,
    RegisterUserComponent,
    UserListComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridModule
  ],
  providers: [ApiServiceService]
})
export class UsermasterModule { }
