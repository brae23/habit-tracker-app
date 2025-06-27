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
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authService: AuthService
  ) {}

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
      this.authService
        .login(this.email, this.password)
        .pipe(takeUntil(this.ngUnsub$))
        .subscribe({
          next: (_res) => {
            this.loginSuccess.emit();
          },
          error: (err) => {
            // Todo: Handle error appropriately, e.g., show a toast or alert
            console.error('Login failed:', err);
          }
      });
    }
  }
}
