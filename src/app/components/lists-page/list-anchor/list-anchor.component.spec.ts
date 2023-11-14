import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAnchorComponent } from './list-anchor.component';
import { TaskList } from 'src/app/models/task-list';

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

    component.taskList = { name: '' } as TaskList;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
