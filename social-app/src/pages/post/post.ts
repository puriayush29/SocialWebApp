import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from 'socket.io-client';
import { PostProvider } from './../../providers/post/post';
@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: string;
  socket: any;
  postSuccess: string;
  image: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider: PostProvider, private camera: Camera) {
    this.socket = io('http://localhost:3000');
  }

  ionViewDidLoad() { }

  goBack() {
    this.navCtrl.pop();
  }
  addPost() {
    if (!this.post) {
      return;
    }
    let body;
    if (!this.image) {
      body = {
        post: this.post
      } 
    } else {
      body = {
        post: this.post,
        image: this.image
      }
    }
    this.postProvider.AddPost(body).subscribe(data => {
      console.log(data);
      this.post = '';
      this.postSuccess = "Post uploaded successfully..."
      this.socket.emit('refresh', {})

    }, err => {
      this.postSuccess = "There is some error while uploading the post..Pls Try Again"
      console.log(err);
    })
  }

selectImage() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: false,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight: 300,
    targetWidth: 300
  };
  this.camera.getPicture(options).then(img => {
    this.image = 'data:image/jpeg;base64,' + img;
  });
}
}

