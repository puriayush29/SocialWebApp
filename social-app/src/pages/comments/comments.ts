import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import io from 'socket.io-client';
import { PostProvider } from './../../providers/post/post';
@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  post: any;
  tabElement: any;
  commentsArray = [];
  comment: string;
  socket:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider: PostProvider) {
    this.socket =  io('http://localhost:3000');
    this.post = this.navParams.get('post');
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
    
  }

  ionViewDidLoad() {
    this.getSinglePost();

    this.socket.on('refreshPage',() => {
    this.getSinglePost();
    })
  }
  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }
  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }


  getSinglePost() {
    this.postProvider.GetPost(this.post._id).subscribe(data => {
      this.commentsArray = data.post.comments.reverse();
      
    })
  }
  getTime(time) {
    return moment(time).fromNow();
  }
  addComment() {
    if(this.comment)
    {
      this.postProvider.AddComment(this.post._id,this.comment).subscribe(data => {
        this.comment = '';
        this.socket.emit('refresh',{});
      },err => console.log(err));
    }
  }
}
