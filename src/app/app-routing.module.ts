import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { GuestGuard } from './guard/guest/guest.guard';
import { AuthResolver } from './resolver/auth/auth.resolver';
import { TaskResolver } from './resolver/task/task.resolver';

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
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver,
      tasks: TaskResolver
    }
  },
  {
    path: 'tasks/create',
    component: CreateTaskComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'tasks/edit/:id',
    component: EditTaskComponent,
    canActivate: [AuthGuard],
    resolve: {
      auth: AuthResolver
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: HelpComponent,
    canActivate: [AuthGuard]
  },{
    path: 'profile',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
    resolve:{
      auth: AuthResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
