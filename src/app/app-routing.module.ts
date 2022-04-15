import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { GuestGuard } from './guard/guest/guest.guard';
import { AuthResolver } from './resolver/auth/auth.resolver';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
