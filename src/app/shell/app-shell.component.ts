import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: 'app-shell.component.html',
  styleUrls: ['app-shell.component.scss'],
})
export class AppShellComponent implements OnInit, OnDestroy {
  ngUnsub$: Subject<void> = new Subject<void>();

  constructor(
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsub$.next();
    this.ngUnsub$.complete();
  }
}
