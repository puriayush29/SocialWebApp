import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import io from 'socket.io-client';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  allUsers = [];
  token: any;
  socket: any;
  userDat:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersProvider: UsersProvider, private tokenProvider: TokenProvider) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.token = value;
      this.getUsers(this.token.username);
    });
    this.socket.on('refreshPage', () => {
      this.tokenProvider.getPayload().then(value => {
        this.token = value;
        this.getUsers(this.token.username);
      });
    });
  }
  getUsers(name) {
    this.usersProvider.GetAllUsers().subscribe(data => {
      _.remove(data.result, { username: name })
      this.allUsers = data.result;
      console.log(this.allUsers);
    }, err => {
      alert(err);
    });
    
  }
  getData(user)
  {
    this.usersProvider.GetUserByName(user.username).subscribe(data => {
      this.viewProfile(data,user);
    })
  }
  viewProfile(userData,user) {
    console.log(userData);
    console.log(user);
    this.navCtrl.push('ViewProfilePage', { userData:userData,user:user});
    this.usersProvider.ProfileNotifications(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    }, err => { console.log(err); })
  }
}
