import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    currentUser:any;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            if(this.currentUser.email && this.currentUser.token){
                return true;
            }
        }else{
            this.router.navigate(['/login']);
        }
        return false;
    }
}