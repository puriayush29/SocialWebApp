import { Component, Input, OnChanges } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.html'
})
export class PostsComponent implements OnChanges{
  @Input() user;
  userPosts =[];
  userData:any;
  socket:any;
  constructor() {
  
  }
ngOnChanges()
{
  if(this.user)
  {
    this.userPosts = this.user.posts.reverse();
    this.userData = this.user;
  }
 
}

getPostTime(time) {
  return moment(time).fromNow();
}

}
