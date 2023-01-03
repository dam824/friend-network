import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:String;
  password:String;
  constructor(private validateService: ValidateService,
  	          private flashMessage:  FlashMessagesService,
  	          private authService: AuthService,
                private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){

  	 const user={
  	 	email:this.email,
  	 	password:this.password
  	 };

     if(!this.validateService.isValidLogin(user)){
       this.flashMessage.show("Veuillez saisir le login et le mot de passe",
         {cssClass:'alert alert-danger',timeout:5000});
       return false;
     }

     if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Entrez une adresse mail valide', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

  	  this.authService.authenticateUser(user).subscribe((data :any) => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show('Vous etes connecté', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
        }
    });
  }

}
