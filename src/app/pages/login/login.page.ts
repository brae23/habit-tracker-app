import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateUserModalComponent } from 'src/app/components/login/create-account-modal/create-user-modal.component';
import { LoginModalComponent } from 'src/app/components/login/login-modal/login-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

 constructor(
  private modalCtl: ModalController
 ){}

 async openLoginModal() {
  let loginModal = await this.modalCtl.create({
    component: LoginModalComponent
  });

  loginModal.present();
 }

 async openSignupModal() {
  let signupModal = await this.modalCtl.create({
    component: CreateUserModalComponent
  });

  signupModal.present();
 }
}
