import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService} from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {User } from '../../models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User=new User();
  constructor(
              private validateService: ValidateService,
              private flashMessage:  FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {

     this.authService.getProfile().subscribe((profile : any) => {
      this.user = profile.user;
    },
     err => {
       console.log(err);
       return false;
     });
  }

  updateUser(){
    
      if(!this.validateService.isValideUpdate(this.user)){
       this.flashMessage.show("Veuillez saisir les champs",
         {cssClass:'alert alert-danger',timeout:5000});
       return false;
     }

     if(!this.validateService.validateEmail(this.user.email)) {
    this.flashMessage.show('Entrez une adresse mail valide', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

      this.authService.updateUser(this.user).subscribe((data :any) => {
        if(data.success) {
         this.flashMessage.show("Compte modifié", {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/dashboard']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
          
        }
    });

  }

}
