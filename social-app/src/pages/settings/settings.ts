import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TokenProvider } from './../../providers/token/token';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  tabElement: any;
  token: any;
  email:string;
  username:string;
  userData:any;
  picId:any;
  picVersion:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenProvider: TokenProvider) {
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(data => {
      this.email = data.email;
      this.username = data.username; 
      this.picId = data.picId;
      this.picVersion = data.picVersion;
    })
  }

  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }
  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }
logout() {
    this.tokenProvider.deleteToken();
    this.navCtrl.setRoot('LoginPage');
  }
  changePassword()
  {
    this.navCtrl.push('ChangePasswordPage');
  }
}
