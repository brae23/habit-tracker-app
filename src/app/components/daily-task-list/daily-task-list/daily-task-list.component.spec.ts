import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyTaskListComponent } from './daily-task-list.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { WritableSignal, signal } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { TaskList } from 'src/app/models/task-list';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';

describe('DailyTaskListComponent', () => {
  let component: DailyTaskListComponent;
  let fixture: ComponentFixture<DailyTaskListComponent>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;
  let nestedDragDropServiceMock: Partial<NestedDragDropService>;
  let dailyTaskListMock: WritableSignal<TaskList>;
  let dropListsMock: WritableSignal<CdkDropList<any>[]>;

  beforeEach(waitForAsync(() => {
    dailyTaskListMock = signal(getMockDailyTaskList());
    dropListsMock = signal([] as CdkDropList<any>[]);

    dailyTaskListServiceMock = {
      dailyTaskList$: dailyTaskListMock,
    }

    nestedDragDropServiceMock = {
      dropLists$: dropListsMock,
    }

    TestBed.configureTestingModule({
      declarations: [DailyTaskListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
        { provide: NestedDragDropService, useValue: nestedDragDropServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
