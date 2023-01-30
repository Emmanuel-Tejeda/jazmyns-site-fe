import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuardService implements CanActivate {

  isLoggedIn: boolean = false

  constructor(private auth: AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    this.auth.storageSubObs.subscribe( res => {
      this.isLoggedIn = res;
    })

    return this.isLoggedIn;
  }

  
}
