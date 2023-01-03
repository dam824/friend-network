import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  readonly ROOT_URL;

  constructor(private http:HttpClient) {
  	this.ROOT_URL="http://localhost:8080/api/friends";
    // this.ROOT_URL="api/friends";
   }

  addFriend(friend) {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.ROOT_URL}/add-friend`, friend, {headers: headers});

  }



   getAllMyFriends(){
     let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.ROOT_URL}/all-my-friends`, {headers: headers});
  }

  deleteFriend(friend){

     let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.delete(`${this.ROOT_URL}/delete-friend/${friend._id}`);
  }

  addAnonymFriend(user){

    let headers=new HttpHeaders();

    return this.http.post(`${this.ROOT_URL}/add-anonym-friend`, user, {headers: headers});
  }

}
