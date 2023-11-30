import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InputCustomEvent } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
  title: string;
  username: string | undefined;
  password: string | undefined;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.title = 'Login';
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next(true);
    this.ngUnsub$.complete();
  }

  setUsername(ev: InputCustomEvent): void {
    this.username = ev.detail.value!;
  }

  setPassword(ev: InputCustomEvent): void {
    this.password = ev.detail.value!;
  }

  loginClicked(): void {
    if (this.username && this.password) {
      this.authService
        .login(this.username, this.password)
        .pipe(takeUntil(this.ngUnsub$))
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/daily-task-list']);
          }
        });
    }
  }
}
