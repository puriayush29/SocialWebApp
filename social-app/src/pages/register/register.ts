import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { TokenProvider } from './../../providers/token/token';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username: string;
  email: string;
  password: string;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProviders: AuthProvider,
    private alertCtrl: AlertController,
    private tokenProvider: TokenProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  RegisterUser() {

    // this.tokenProvider.getPayload().then(result => {
    //   console.log(result);
    // })
    this.showLoader();
    this.authProviders.RegisterUser(this.email, this.username, this.password).subscribe(data => {
      this.tokenProvider.setToken(data.token)
      setTimeout(() => {
        this.loading.dismiss();
        this.navCtrl.setRoot('TabsPage');
      }, 3000)



    }, err => console.log(err));

  }

  // ShowErrorAlert(message)
  // {
  //   let alert = this.alertCtrl.create({
  //     title:'Signup Error',
  //     subTitle:`${message}`,
  //     buttons:['OK']
  //   })
  //   alert.present();
  // }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading....'
    });
    this.loading.present();
  }
}
