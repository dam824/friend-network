import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { Router } from '@angular/router';
import {User } from '../../models/user.model'
import {Friend } from '../../models/friend.model'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  friends:Array<Friend>;
  user:User=new User();
  constructor(private friendService:FriendService, private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

  	this.friendService.getAllMyFriends().subscribe((data : any) => {
      this.user = data.user;
      this.friends = data.users;
    },
     err => {
       console.log(err);
       return false;
     });

  }

  deleteFriend(friend:Friend){

     this.friendService.deleteFriend(friend).subscribe(res => {

      this.friends=this.friends.filter(fr => fr._id!=friend._id);
    });
  }

 




  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
