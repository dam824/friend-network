import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()

// securité accex aux routes. 
export class AuthGuard{

   constructor(private authService: AuthService,private route:Router)
   {

   }

   canActivate(){

   	if(this.authService.isLoggedIn()){
        return true;
   	}else{

        this.route.navigate(['login']);
        return false;
   	}

   }
}
