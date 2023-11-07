import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  ngUnsub$: Subject<boolean> = new Subject<boolean>();

  constructor(private platform: Platform) {}

  ngOnInit(): void {
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
    this.ngUnsub$.next(true);
    this.ngUnsub$.unsubscribe();
  }
}
