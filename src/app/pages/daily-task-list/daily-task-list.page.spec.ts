import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DailyTaskListPage } from './daily-task-list.page';

describe('DailyTaskListPage', () => {
  let component: DailyTaskListPage;
  let fixture: ComponentFixture<DailyTaskListPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DailyTaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
