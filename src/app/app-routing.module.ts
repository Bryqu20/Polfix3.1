import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { CreateMediaRecordComponent } from './components/create-media-record/create-media-record.component';
import { ViewMediaComponent } from './components/view-media/view-media.component';
import { UpdateMediaComponent } from './components/update-media/update-media.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'Registration',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'UploadMedia',
    component: CreateMediaRecordComponent
  },

  {
    path: 'viewMedia/:id',
    component: ViewMediaComponent
  },
  {
    path: 'editMedia/:id',
    component: UpdateMediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
