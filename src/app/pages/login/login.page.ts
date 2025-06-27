import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class LoginPage implements OnInit, OnDestroy {
  shouldShowLogin: boolean = false;
  shouldShowSignup: boolean = false;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {
    console.log('LoginPage initialized');
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  async openLoginModal() {
    this.shouldShowLogin = true;
  }

  async openSignupModal() {
    this.shouldShowSignup = true;
  }

  onLoginSuccess() {
    this.shouldShowLogin = false;
    this.shouldShowSignup = false;
  }

  onSignupSuccess() {
    this.shouldShowSignup = false;
    this.shouldShowLogin = true;
  }

  onCanceled() {
    this.shouldShowLogin = false;
    this.shouldShowSignup = false;
  }
}
