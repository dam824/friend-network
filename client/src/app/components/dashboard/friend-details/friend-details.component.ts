import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Friend } from '../../../models/friend.model'

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})
export class FriendDetailsComponent implements OnInit {

  @Input() friend:Friend;
  @Output() deleteFriend: EventEmitter<Friend> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteOneFriend(friend){
  	this.deleteFriend.emit(friend);
  }

}
