import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import moment from 'moment';
import io from 'socket.io-client';
import { PostProvider } from './../../providers/post/post';
import { TokenProvider } from './../../providers/token/token';
@IonicPage()
@Component({
  selector: 'page-streams',
  templateUrl: 'streams.html',
})
export class StreamsPage {

  stream: any;
  streamArray: any;
  topStreamsArray:any;
  socket:any;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider: PostProvider,private tokenProvider:TokenProvider,private modalCtrl:ModalController) {
    this.socket = io('http://localhost:3000');
    this.stream = 'post'
  }


  ionViewDidLoad() {
    this.tokenProvider.getPayload().then(value => {
      this.user = value;
    })
    this.getAllPosts();

    this.socket.on('refreshPage',()=> {
      this.getAllPosts();
    })
  }

  getAllPosts() {
    this.postProvider.GetAllPosts().subscribe(data => {
      this.streamArray = data.posts;
      this.topStreamsArray = data.top;
    },err => {
      if(err.error.token === null)
      {
        this.tokenProvider.deleteToken();
        this.navCtrl.setRoot('LoginPage');
      }
    }
    )
  }
  getPostTime(time) {
    return moment(time).fromNow();
  }
  likePost(post) {
    this.postProvider.AddLike(post).subscribe(data => {
      this.socket.emit('refresh',{});
      console.log(data);
    },err => console.log(err));
  }
  addComment(post) {
    this.navCtrl.push('CommentsPage', { post }) //post:post
  }

  CheckInLikesArray(arr, username) {
		return _.some(arr, { username: username });
  }
  
  postModal()
  {
    const modal =  this.modalCtrl.create('PostPage');
    modal.present();
  }
}
