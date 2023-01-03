import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
//validations du formulaire register
  validateRegister(user) {
    if(user.name == undefined || user.email == undefined  || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidLogin(user:any){
    if(user.email==undefined || user.password==undefined)
    {
      return false;
    }else{
      return true;
    }
  }
  isValideUpdate(user){

    if (user.name == undefined || user.email == undefined || user.role==undefined
      ) {

        return false;
    }else{
      return true;
    }
  }
}
