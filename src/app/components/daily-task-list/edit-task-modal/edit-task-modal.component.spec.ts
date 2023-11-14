import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { EditTaskModalComponent } from './edit-task-modal.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { WritableSignal, signal } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';

describe('EditTaskModalComponent', () => {
  let component: EditTaskModalComponent;
  let fixture: ComponentFixture<EditTaskModalComponent>;
  let modalControllerMock: Partial<ModalController>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;
  let dailyTaskListMock: WritableSignal<TaskList>;

  beforeEach(waitForAsync(() => {
    dailyTaskListMock = signal(getMockDailyTaskList());

    dailyTaskListServiceMock = {
      dailyTaskList$: dailyTaskListMock,
    }

    TestBed.configureTestingModule({
      declarations: [EditTaskModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
        { provide: ModalController, useValue: modalControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskModalComponent);
    component = fixture.componentInstance;

    component.listItem = signal(dailyTaskListMock().listItems[0]);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
