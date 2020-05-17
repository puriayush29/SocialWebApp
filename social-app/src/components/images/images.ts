import { Component, Input, OnChanges } from '@angular/core';
import io from 'socket.io-client';
import { UsersProvider } from './../../providers/users/users';
@Component({
  selector: 'app-images',
  templateUrl: 'images.html'
})
export class ImagesComponent implements OnChanges {
  @Input() Images;
  userImages = [];
  hasImages = false;
  socket:any;
  constructor(private usersProvider: UsersProvider) {
    this.socket = io('http://localhost:3000');
  }
  ngOnChanges() {
    if (this.Images && this.Images.hasImages) {
      this.userImages = this.Images.user.images;
      this.hasImages = true;
      console.log(this.Images.user.images);
    }
    if (this.Images && !this.Images.hasImages) {
      this.userImages = this.Images.images;
      this.hasImages = false;

    }
    this.socket.on('refreshPage',()=> {
      if (this.Images && this.Images.hasImages) {
        this.userImages = this.Images.user.images;
        this.hasImages = true;
        console.log(this.Images.user.images);
      }
      if (this.Images && !this.Images.hasImages) {
        this.userImages = this.Images.images;
        this.hasImages = false;
  
      }
    })
  }
  setAsDefault(value) {
    this.usersProvider.SetDefaultImage(value.imgId, value.imgVersion).subscribe(data => {
      this.socket.emit('refresh',{});
    },err => console.log(err));
  }

}
