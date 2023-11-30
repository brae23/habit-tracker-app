import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  ngUnsub$: Subject<void> = new Subject<void>();

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.userLoggedIn$
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      });

    this.platform.keyboardDidShow
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((ev: any) => {
        console.log('Keyboard did show invoked! :');
        console.log(ev);
      });
    this.platform.keyboardDidHide
      .pipe(takeUntil(this.ngUnsub$))
      .subscribe((ev: any) => {
        // Revert height to original height
        console.log('Keyboard did hide invoked! :');
        console.log(ev);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next();
    this.ngUnsub$.complete();
  }
}
