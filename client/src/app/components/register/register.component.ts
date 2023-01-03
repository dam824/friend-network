import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 

  name: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
  	          private flashMessage:  FlashMessagesService,
  	          private authService: AuthService,
              private router: Router) { 

  }

  ngOnInit(): void {

  }

  registerUser(){

  	 const user={
  	 	name:this.name,
  	 	email:this.email,
  	 	password:this.password
  	 };

  	if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Veuillez entrer tous les champs', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

 
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Entrez une adresse mail valide', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

     
     this.authService.registerUser(user).subscribe((data :any) => {
    if(data.success) {
      this.flashMessage.show('Votre compte a été crée et vous pouvez vous connecter', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });



  }

 

}
