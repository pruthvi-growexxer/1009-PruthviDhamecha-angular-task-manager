import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ViewProfileComponent } from '../components/view-profile/view-profile.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ViewProfileComponent,
      },
      {
        path: 'edit/:id',
        component: EditProfileComponent,
      },
    ]),
  ]
})
export class UserModule { }
