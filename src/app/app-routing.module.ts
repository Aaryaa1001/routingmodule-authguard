import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  // {path:'',component:DashboardComponent},
  {path:'',component:LoginComponent},

  {
    path: 'common',
    loadChildren: () =>
    import('./common/common.module').then((m) => m.CommonModule),
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
