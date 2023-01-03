import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { FriendService } from '../../services/friend.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  name: String;
  email: String;
  password: String;


  constructor(private validateService: ValidateService,
  	          private flashMessage:  FlashMessagesService,
  	          private friendService: FriendService,
  	          private authService: AuthService,
              private router: Router) { 

  }

  ngOnInit(): void {

  
  }

  addFriend(){

  	 const user={
  	 	name:this.name,
  	 	email:this.email,
  	 	password:this.password,
  	 };

  	if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Veuillez entrer tous les champs', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

 
    if(!this.validateService.validateEmail(user.email)) {
    this.flashMessage.show('Entrez une adresse mail valide', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  

   this.friendService.addAnonymFriend(user).subscribe((data:any)=> {
       
       if(data.success) {
      this.flashMessage.show('Votre ami a été ajouté', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/dashboard']);
    } else {
      this.flashMessage.show('Erreur lors de la creation du compte', {cssClass: 'alert-danger', timeout: 3000});
    }
   });




  }

}
