import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsHomePage } from './lists-home.page';

describe('ListsHomePage', () => {
  let component: ListsHomePage;
  let fixture: ComponentFixture<ListsHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
