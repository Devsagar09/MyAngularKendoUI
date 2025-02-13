import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { KendoComponentComponent } from './kendo-component/kendo-component.component';

const routes: Routes = [
  {
    path:'',
    component: KendoComponentComponent
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
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
