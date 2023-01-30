import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: string | null = null;


  constructor(private storageService: StorageService, private auth: AuthService) { }

  ngOnInit(): void {
    
    this.isLoggedIn = localStorage.getItem('token');
  }

  logout(): void {
    this.auth.logout();
  }

}
