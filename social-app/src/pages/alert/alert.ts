import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from 'socket.io-client';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {

  payload: any;
  notifications = [];
  socket: any;
  message:string;
  alertExist =  false;
  flag:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private tokenProvider: TokenProvider, private usersProvider: UsersProvider) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.payload = value;
      this.getUser(this.payload._id);
    });
    this.socket.on('refreshPage',() => {
      this.tokenProvider.getPayload().then(value => {
        this.payload = value;
        this.getUser(this.payload._id);
      });
    })
  }

  markAlert(value) {
    this.usersProvider.MarkNotification(value._id).subscribe(data => {
      this.socket.emit('refresh',{});
    },err => {
      console.log(err);
    })
  }

 deleteAlert(value) {
    this.usersProvider.MarkNotification(value._id,true).subscribe(data => {
      this.socket.emit('refresh',{});
    },err => {
      console.log(err);
    });
    this.flag = true;
  }
  getUser(id) {
    this.usersProvider.GetUserById(id).subscribe(data => {
      if(this.notifications === [])
      {
        this.alertExist = false; 
       this.message= "There are no alerts";
       
      }
      else {
        this.alertExist = true;
      this.notifications = data.result.notifications.reverse();
      }
      if(this.flag == true)
      {
        this.alertExist = false;
      }
    })
  }

}
