import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;
  tabElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
    , private authProviders: AuthProvider,
    private alertCtrl: AlertController,
    private tokenProvider: TokenProvider,
    private loadingCtrl: LoadingController) {
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
    }

  ionViewDidLoad() {
    if (this.tabElement) {
      (this.tabElement as HTMLElement).style.display = 'none';
    }
  }
  ionViewWillEnter() {
    if (this.tabElement) {
      (this.tabElement as HTMLElement).style.display = 'none';
    }
  }
  loginUser() {
    this.showLoader();
    const body = { email: this.email, password: this.password }
    this.authProviders.LoginUser(body).subscribe(data => {
      this.tokenProvider.setToken(data.token)
      setTimeout(() => {
        this.loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }, 1000)

    }, err => console.log(err));

  }
  RegisterPage() {
    this.navCtrl.push('RegisterPage');
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading....'
    });
    this.loading.present();
  }
}
