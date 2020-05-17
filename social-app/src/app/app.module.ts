import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { AuthProvider } from '../providers/auth/auth';
import { MessageProvider } from '../providers/message/message';
import { PostProvider } from '../providers/post/post';
import { TokenInterceptor } from '../providers/token-interceptor';
import { UsersProvider } from '../providers/users/users';
import { TokenProvider } from './../providers/token/token';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    // HomePage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    NgxEmojiPickerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // HomePage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true
    },
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    TokenProvider,
    MessageProvider,
    PostProvider,
    UsersProvider,
    Camera
   
  ]
})
export class AppModule {}
