import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  tabElement: any;
  user: any;
  userData:any;
  userprofile: string;
  headerImage: any;
  userFriends: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer,private popOverCtrl:PopoverController) {
    this.user = this.navParams.get('user');
    console.log(this.user);
    this.userData = this.navParams.get('userData');
    console.log(this.userData);
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
    this.userprofile = 'posts';
  }

  ionViewDidLoad() {
    
    this.getImage();
  }
  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }
  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }
  getImage() {
    const imgUrl = `https://res.cloudinary.com/anheart/image/upload/v${this.user.picVersion}/${this.user.picId}`;
    this.headerImage = this.sanitizer.bypassSecurityTrustStyle(`url(${imgUrl})`)
  }
  segmentChanged(event) {
    if (event._value === 'following') {
      this.userFriends = {isFollowing: true,user:this.userData}
    }
    if (event._value === 'followers') {
      this.userFriends = {isFollowing: false,user:this.userData}
    }
  }
  chatPage(value)
  {
    this.navCtrl.push('ChatPage',{
      receiverId:value._id,
      receiverName:value.username
    });
  }
  openPopOver(event,value)
  {
    let popover = this.popOverCtrl.create('PopOverPage',{user:value})
    popover.present({
    ev:event
    });
  }
}
