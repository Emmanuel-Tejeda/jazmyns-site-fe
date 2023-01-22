import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    UploadComponent,
    BoardAdminComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
