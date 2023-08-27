import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitStatisticsPage } from './habit-statistics.page';

describe('HabitStatisticsPage', () => {
  let component: HabitStatisticsPage;
  let fixture: ComponentFixture<HabitStatisticsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HabitStatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
