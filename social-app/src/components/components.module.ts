import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PostsComponent } from './posts/posts';
import { UserFriendsComponent } from './user-friends/user-friends';
import { ImagesComponent } from './images/images';
import { UserProfileFriendsComponent } from './user-profile-friends/user-profile-friends';
@NgModule({
	declarations: [PostsComponent,
    UserFriendsComponent,
    ImagesComponent,
    UserProfileFriendsComponent],
	imports: [IonicModule],
	exports: [PostsComponent,
    UserFriendsComponent,
    ImagesComponent,
    UserProfileFriendsComponent]
})
export class ComponentsModule {}
