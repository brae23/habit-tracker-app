import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {
  title: string;
  ngUnsub$: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title = 'User Profile';
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next();
    this.ngUnsub$.complete();
  }

  logoutClicked(): void {
    this.authService.logout()
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/login']);
        }
      });
  }
}
