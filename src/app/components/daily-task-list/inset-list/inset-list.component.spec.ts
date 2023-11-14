import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { InsetListComponent } from './inset-list.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { WritableSignal, signal } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { CdkDropList } from '@angular/cdk/drag-drop';

describe('InsetListComponent', () => {
  let component: InsetListComponent;
  let fixture: ComponentFixture<InsetListComponent>;
  let modalController: Partial<ModalController>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;
  let nestedDragDropServiceMock: Partial<NestedDragDropService>;
  let dailyTaskListMock: WritableSignal<TaskList>;
  let dropListMock: WritableSignal<CdkDropList<any>[]>;

  beforeEach(waitForAsync(() => {
    dailyTaskListMock = signal(getMockDailyTaskList());
    dropListMock = signal([]);

    dailyTaskListServiceMock = {
      dailyTaskList$: dailyTaskListMock,
      getListItem: jasmine.createSpy('getListItem').and.returnValue(signal(dailyTaskListMock().listItems[0])),
    }

    nestedDragDropServiceMock = {
      dropLists$: dropListMock,
    }

    TestBed.configureTestingModule({
      declarations: [InsetListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalController },
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
        { provide: NestedDragDropService, useValue: nestedDragDropServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InsetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
