import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnDestroy {
  email: string | undefined;
  password: string | undefined;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();
  usernameValueText: string;
  shouldShowEmailValueText: boolean = false;
  passwordValueText: string;
  shouldShowPasswordValueText: boolean = false;
  loading: boolean = false;
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authService: AuthService
  ) {
    this.usernameValueText = 'Email is empty!';
    this.passwordValueText = 'Password is empty!';
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  setEmail(ev: InputCustomEvent): void {
    this.email = ev.detail.value!;
  }

  setPassword(ev: InputCustomEvent): void {
    this.password = ev.detail.value!;
  }

  loginClicked(): void {
    if (this.email && this.password) {
      this.loading = true;
      this.authService
        .login(this.email, this.password)
        .pipe(takeUntil(this.ngUnsub$))
        .subscribe({
          next: (_res) => {
            this.loading = false;
            this.loginSuccess.emit();
          },
          error: (err) => {
            this.loading = false;
            // Todo: Handle error appropriately, e.g., show a toast or alert
            console.error('Login failed:', err);
          }
      });
    } else {
      if (!this.email) {
        this.shouldShowEmailValueText = true;
      } else {
        this.shouldShowEmailValueText = false;
      }

      if (!this.password) {
        this.shouldShowPasswordValueText = true;
      } else {
        this.shouldShowPasswordValueText = false;
      }
    }
  }

  cancelClicked(): void {
    this.canceled.emit();
  }
}
