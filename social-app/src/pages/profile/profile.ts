import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from 'socket.io-client';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userprofile: string;
  headerImage: any;
  userFriends: any;
  token: any;
  userData: any;
  userImages: any;
  socket: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenProvider: TokenProvider, private usersProvider: UsersProvider, private sanitizer: DomSanitizer) {
    this.userprofile = "posts";
    this.socket = io('http://localhost:3000');
  
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.token = value;
      this.getUser(this.token._id);
    });
    this.socket.on('refreshPage', () => {
      this.tokenProvider.getPayload().then(value => {
        this.token = value;
        this.getUser(this.token._id);
      });
    })
  }
  
  
  getUser(id) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      this.userData = data.result;
      this.getImage(this.userData);
      this.userImages = { hasImages: true, user: this.userData };
    });

  }
  getImage(obj) {
    const imgUrl = `https://res.cloudinary.com/anheart/image/upload/v${obj.picVersion}/${obj.picId}`;
    this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${imgUrl})`)
  }

  segmentChanged(event) {
    if (event._value === 'following') {
      this.userFriends = { isFollowing: true, user: this.userData }
    }
    if (event._value === 'followers') {
      this.userFriends = { isFollowing: false, user: this.userData }
    }
  }
  settingsPage()
  {
    this.navCtrl.push('SettingsPage');
  }
}
