import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import io from 'socket.io-client';
import { MessageProvider } from './../../providers/message/message';
import { TokenProvider } from './../../providers/token/token';
import { UsersProvider } from './../../providers/users/users';
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) contentDiv: Content;
  tabElement: any;
  message: string;
  receiverName: any;
  receiverId: any;
  sender: any;
  msgArray = [];
  socket: any;
  receiver: any;
  typingMessage;
  typing = false;
  isOnline = false;
  public toggled = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private msgProvider: MessageProvider, private tokenProvider: TokenProvider, private userProvider: UsersProvider) {
    this.socket = io('http://localhost:3000');
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
    this.receiverId = this.navParams.get('receiverId');
    this.receiverName = this.navParams.get('receiverName');
    this.goToBottom();
  }

  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.sender = value;
      this.getAllMessages(this.sender._id, this.receiverId);

      const val = {
        room: 'global',
        user: this.sender.username
      }
      this.socket.emit('online', val);

      const params = {
        room1: this.sender.username,
        room2: this.receiverName
      }
      this.socket.emit('join chat', params);
    });
    this.getReceiveData();
    this.socket.on('refreshPage', () => {
      this.goToBottom();
      this.tokenProvider.getPayload().then(value => {
        this.sender = value;

        this.getAllMessages(this.sender._id, this.receiverId);
      });
    });
    this.SocketFunction();
  }
  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }
  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }

  SocketFunction() {
    this.socket.on('is_typing', data => {
      if (data.sender === this.receiverName) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiverName) {
        this.typing = false;
      }
    });

    this.socket.on('usersOnline', data => {
      const result = _.indexOf(data, this.receiverName);
      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    });
  }
  getReceiveData() {
    this.userProvider.GetUserByName(this.receiverName).subscribe(data => {
      this.receiver = data.result;
    })
  }
  handleSelection(event) {
    if (this.message === undefined) {
      this.message = '';
    }
    else {
      this.message = this.message + " " + event.char;
    }
  }

  Toggled() {
    this.toggled = !this.toggled;
  }

  getAllMessages(senderId, receiverId) {
    this.msgProvider.GetAllMessages(senderId, receiverId).subscribe(data => {

      this.msgArray = data.messages.message;
    })
  }

  privateMessage() {
    if (!this.message) {
      return;
    }
    this.msgProvider.SendMessage(this.sender._id, this.receiverId, this.receiverName, this.message).subscribe(data => {
      this.socket.emit('refresh', {});
      this.message = '';
    }, err => {
      console.log(err);
    })
  }

  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.sender.username,
      receiver: this.receiverName
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.sender.username,
        receiver: this.receiverName
      });
    }, 500);
  }
  goToBottom() {
    setTimeout(() => {
      if (this.contentDiv._scroll) {
        this.contentDiv.scrollToBottom();
      }
    }, 500)
  }
  goBack() {
    this.navCtrl.pop();
  }
}
