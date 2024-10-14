import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommondashComponent } from '../commondash/commondash.component';
import { MaindashComponent } from '../maindash/maindash.component';
import { HeaderComponent } from '../header/header.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [{
  path: '',
  component: HeaderComponent,
  children: [
  { path: '',redirectTo:'commondash',pathMatch:"full" },
  { path: 'commondash', component: CommondashComponent },

  {path:'maindash',component:MaindashComponent,canActivate:[AuthGuard]}
  // { path: 'add-product', component: AddProductComponent },
  ],
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
