import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { KendoComponentComponent } from './kendo-component/kendo-component.component';
import { RegisterUserComponent } from './UserMaster/register-user/register-user.component';
import { LoginUserComponent } from './UserMaster/login-user/login-user.component';
import { UserListComponent } from './UserMaster/user-list/user-list.component';

const routes: Routes = [
  {
    path:'',
    component: LoginUserComponent
  },
  {
    path:'home',
    component: KendoComponentComponent
  },
  {
    path:'child',
    component:ChildComponentComponent
  },
  {
    path:'registeruser',
    component:RegisterUserComponent
  },
  {
    path:'login',
    component:LoginUserComponent
  },
  {
    path:'getUser',
    component:UserListComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
