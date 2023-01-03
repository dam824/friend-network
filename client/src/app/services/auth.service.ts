import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
// import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//adresse APIREST
   readonly ROOT_URL;
   authToken:any;
   user:any;
//call API REST pour les requetes HTTP
  constructor(private http:HttpClient) {
  	this.ROOT_URL="http://localhost:8080/api/users";
    // this.ROOT_URL="api/users";
   }

   registerUser(user) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.ROOT_URL}/register`, user, {headers: headers});

  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    //corps de la requete va contenir des donnees JSON
    headers.append('Content-Type', 'application/json');
    //retourne un observable. 1 valeur unique (reponse http)
    return this.http.post(`${this.ROOT_URL}/authenticate`, user, {headers: headers});

   }

   updateUser(user){

     let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.ROOT_URL}/update-profile`, user, {headers: headers});
   }

   storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return token;
  }





  getProfile() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.ROOT_URL}/profile`, {headers: headers});

  }

   getAllUsers(){


     let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.ROOT_URL}/all-users`, {headers: headers});
  }


  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    this.loadToken();

    if(this.authToken==null)return false;
    return !helper.isTokenExpired(this.authToken.replace("JWT ", ""));

  }

  getUsername(){
    return JSON.parse(localStorage.getItem('user'));

  }

}
