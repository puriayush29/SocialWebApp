import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import io from 'socket.io-client';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
@IonicPage()
@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {

  user: any;
  token: any;
  following = false;
  socket:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usersProvider: UsersProvider, private tokenProvider: TokenProvider) {
    this.user = this.navParams.get('user');
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.token = value;
      this.getUser(this.token._id);
    });
    this.socket.on('refreshPage',() => {
      this.tokenProvider.getPayload().then(value => {
        this.token = value;
        this.getUser(this.token._id);
      });
    });
  }
  getUser(id) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      console.log(data);
      const result = _.find(data.result.following, ['userFollowed._id', this.user._id]);
      console.log(result);
      if(result)
    {
      this.following = true;
    }
    else{
      this.following = false;
    }
    });
    
  }

  follow() {
    this.usersProvider.FollowUser(this.user._id).subscribe(data => {
      this.socket.emit('refresh',{});
    },err => console.log(err));
  }
  unfollow() {
    this.usersProvider.UnFollowUser(this.user._id).subscribe(data => {
      this.socket.emit('refresh',{});
    },err => console.log(err));
  }
}
