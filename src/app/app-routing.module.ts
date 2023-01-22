import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [

  {path: '', redirectTo: '/gallery', pathMatch: 'full'},

  { path: 'gallery', component: GalleryComponent },
  {path: 'home', component: HomeComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }