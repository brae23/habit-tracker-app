import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent implements OnDestroy {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordVerify: string | undefined;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();
  usernameValueText: string;
  shouldShowUsernameValueText: boolean = false;
  emailValueText: string;
  shouldShowEmailValueText: boolean = false;
  passwordsMustMatchText: string;
  shouldShowPasswordMatchText: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtl: ModalController,
  ) {
    this.usernameValueText = "Username is empty!";
    this.emailValueText = "Email is empty!";
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  setUsername(ev: InputCustomEvent): void {
    this.username = ev.detail.value!;
  }

  setEmail(ev: InputCustomEvent): void {
    this.email = ev.detail.value!;
  }

  setPassword(ev: InputCustomEvent): void {
    this.password = ev.detail.value!;
  }

  setPasswordVerify(ev: InputCustomEvent): void {
    this.passwordVerify = ev.detail.value!;
  }

  signupClicked(): void {
    let userIsValid = this.usernameInputIsValid();
    let emailIsValid = this.emailInputIsValid();
    let passwordIsValid = this.passwordInputIsValid();

    if (
      userIsValid &&
      emailIsValid &&
      passwordIsValid
    ) {
      this.authService
      .createUser(this.username!, this.email!, this.password!)
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((res) => {
        if (res) {
          this.modalCtl.dismiss();
          this.router.navigate(['/daily-task-list']);
        }
      });
    }
  }

  private usernameInputIsValid(): boolean {
    if (this.username == undefined || this.username.length < 1) {
      this.shouldShowUsernameValueText = true;
      return false;
    } else {
      this.shouldShowUsernameValueText = false;
      return true;
    }
  }

  private emailInputIsValid(): boolean {
    if (this.email == undefined || this.email.length < 1) {
      this.shouldShowEmailValueText = true;
      return false;
    } else {
      this.shouldShowEmailValueText = false;
      return true;
    }
  }

  private passwordInputIsValid(): boolean {
    if (this.password == undefined || this.password.length < 1) {
      this.passwordsMustMatchText = "Password is empty!";
      this.shouldShowPasswordMatchText = true;
      return false;
    } else if (this.password.length < 12 || this.password.length > 128) {
      this.passwordsMustMatchText = "Password must be between 12 and 128 characters!";
      this.shouldShowPasswordMatchText = true;
      return false;
    } else if (this.passwordVerify != this.password) {
      this.passwordsMustMatchText = "Passwords must match!";
      this.shouldShowPasswordMatchText = true;
      return false;
    } else {
      this.shouldShowPasswordMatchText = false;
      return true;
    }
  }
}
