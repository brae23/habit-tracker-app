import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAnchorComponent } from './list-anchor.component';
import { List } from 'src/app/models/list';

describe('ListAnchorComponent', () => {
  let component: ListAnchorComponent;
  let fixture: ComponentFixture<ListAnchorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListAnchorComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListAnchorComponent);
    component = fixture.componentInstance;

    component.taskList = { name: '' } as List;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
