import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyTaskListPage } from './daily-task-list.page';

describe('DailyTaskListPage', () => {
  let component: DailyTaskListPage;
  let fixture: ComponentFixture<DailyTaskListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DailyTaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
