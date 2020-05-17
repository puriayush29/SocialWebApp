import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  tabElement: any;
  passwordForm: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,private usersProvider:UsersProvider,private alertCtrl:AlertController) {
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
    this.Init();
  }

  Init()
  {
    this.passwordForm = this.fb.group({
      cpassword: ['',Validators.required],
      newPassword: ['',Validators.required],
      confirmPassword:['',Validators.required]
    }, {
      validator:this.Validate.bind(this)
    });
   
  }
  ionViewWillEnter() {
    (this.tabElement as HTMLElement).style.display = 'none';
  }
  ionViewWillLeave() {
    (this.tabElement as HTMLElement).style.display = 'flex';
  }
  ionViewDidLoad() {
   
  }

  onPasswordChange() {
    this.usersProvider.ChangePassword(this.passwordForm.value).subscribe(data => {
      let alert = this.alertCtrl.create({
        title:'Password Changed',
        subTitle:'Password Changed Successfully',
        buttons:['OK']
      });
      alert.present();
    },err => {
      if(err.error.msg)
      {
        let alert = this.alertCtrl.create({
        title:'Validation Error',
        subTitle:`${err.error.msg[0].message}`,
        buttons:['OK']
        });
        alert.present();
      }
      
      if(err.error.message)
      {
        
        let alert = this.alertCtrl.create({
        title:'Password change error',
        subTitle:`${err.error.message}`,
        buttons:['OK']
        });
        alert.present();
      }
    });

  }


  Validate(passwordFormGroup: FormGroup) {
		const new_password = passwordFormGroup.controls.newPassword.value;
		const confirm_password = passwordFormGroup.controls.confirmPassword.value;

		if (confirm_password.length <= 0) {
			return null;
		}

		if (confirm_password !== new_password) {
			return {
				doesNotMatch: true
			};
    }
    
		return null;
	}

}
