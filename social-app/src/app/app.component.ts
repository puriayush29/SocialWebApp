import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Nav, Platform } from 'ionic-angular';
import io from 'socket.io-client';
import { TokenProvider } from './../providers/token/token';
// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav:Nav;
//   rootPage:string = 'LoginPage';  This is known as lazy loading 

socket:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage,private tokenProvider:TokenProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.socket = io('http://localhost:3000');
      this.storage.get('auth-token').then(token => {
        if(token){

          this.tokenProvider.getPayload().then(data => {
            const params = {
              room:'global',
              user:data.username
            }
            this.socket.emit('online',params)
          })
          this.nav.setRoot('TabsPage');

        }
        else {
          this.nav.setRoot('LoginPage');
        }
      });
    });
  }
}

