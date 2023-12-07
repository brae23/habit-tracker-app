import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { InsetListComponent } from './inset-list.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { WritableSignal, signal } from '@angular/core';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { IListItem } from 'src/app/models/i-list-item';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

describe('InsetListComponent', () => {
  let component: InsetListComponent;
  let fixture: ComponentFixture<InsetListComponent>;
  let modalControllerMock: Partial<ModalController>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;
  let nestedDragDropServiceMock: Partial<NestedDragDropService>;
  let dropListMock: WritableSignal<CdkDropList<any>[]>;
  let listMock: WritableSignal<IListItem>;
  let editModalMock: HTMLIonModalElement;

  beforeEach(waitForAsync(() => {
    listMock = signal(
      getMockDailyTaskList().listItems.filter(
        (item) => item.listItems?.length! > 1,
      )[0],
    );
    dropListMock = signal([]);
    editModalMock = {
      present: () => {
        return Promise.resolve();
      },
    } as HTMLIonModalElement;

    dailyTaskListServiceMock = {
      getListItem: jasmine.createSpy('getListItem').and.returnValue(listMock),
      updateListItemCompletedState: jasmine.createSpy(
        'updateListItemCompletedState',
      ),
    };

    nestedDragDropServiceMock = {
      dropLists$: dropListMock,
      register: jasmine.createSpy('register'),
      unregister: jasmine.createSpy('unregister'),
      drop: jasmine.createSpy('drop'),
    };

    modalControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(editModalMock),
    };

    TestBed.configureTestingModule({
      declarations: [InsetListComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
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

  it('should register droplist if ViewChild droplist exists', () => {
    // Act
    let dropList = {} as CdkDropList;
    component.dropList = dropList;

    // Assert
    expect(nestedDragDropServiceMock.register).toHaveBeenCalledOnceWith(
      dropList,
    );
  });

  it('should setup task count data on init', () => {
    // Arrange
    let listLength = listMock().listItems!.length;
    let completedCount = 0;
    listMock().listItems!.forEach((item) => {
      if (item.completed) {
        completedCount++;
      }
    });

    // Act happens as part of test setup - ngOnInit call

    // Assert
    expect(component.completedTaskCount()).toEqual(completedCount);
    expect(component.listLength()).toEqual(listLength);
  });

  it('should evaluate task completed states on changes', () => {
    // Arrange
    let listLength = listMock().listItems!.length;
    let completedCount = 0;
    listMock().listItems!.forEach((item) => {
      if (item.completed) {
        completedCount++;
      }
    });

    // Act
    component.ngOnChanges();

    // Assert
    expect(component.completedTaskCount()).toEqual(completedCount);
    expect(component.listLength()).toEqual(listLength);
  });

  it('should update list item completed state on click event', () => {
    // Arrange
    let currentCompletedState = false;
    let newCompletedState = true;
    let listItem = {
      id: 'test',
      completed: currentCompletedState,
    } as IListItem;

    // Act
    component.listItemClickedEvent(listItem);

    // Assert
    expect(
      dailyTaskListServiceMock.updateListItemCompletedState,
    ).toHaveBeenCalledOnceWith(listItem.id, listMock().id, newCompletedState);
  });

  it('should update list collapsed state on list clicked', () => {
    // Arrange
    component.isCollapsed = true;

    // Act
    component.onListClicked();

    // Assert
    expect(component.isCollapsed).toBeFalse();
  });

  it('should re-evaluate completed state on item dropped in component drop list', () => {
    // Arrange
    let event = { data: 'test' };
    spyOn<any>(component, 'evaluateCompletedState');

    // Act
    component.onItemDropped(event);

    // Assert
    expect(nestedDragDropServiceMock.drop).toHaveBeenCalledOnceWith(event);
    expect(component['evaluateCompletedState']).toHaveBeenCalledTimes(1);
  });

  describe('Edit Task Modal', () => {
    it('should create modal with list item data if list item provided', async () => {
      // Arrange
      let listItem = { id: 'test' } as IListItem;
      let listItemSignal = signal(listItem);
      let expectedModalData = {
        component: EditTaskModalComponent,
        componentProps: {
          ['listItem']: listItemSignal,
        },
      };
      spyOn<any>(editModalMock, 'present');

      // Act
      await component.itemEditClicked(listItem);

      // Assert
      expect(modalControllerMock.create).toHaveBeenCalledWith(
        expectedModalData,
      );
      expect(editModalMock.present).toHaveBeenCalledTimes(1);
    });

    it('should create modal with parent list data if no list item provided', async () => {
      // Arrange
      let expectedModalData = {
        component: EditTaskModalComponent,
        componentProps: {
          ['listItem']: component.taskList,
        },
      };
      spyOn<any>(editModalMock, 'present');

      // Act
      await component.itemEditClicked();

      // Assert
      expect(modalControllerMock.create).toHaveBeenCalledWith(
        expectedModalData,
      );
      expect(editModalMock.present).toHaveBeenCalledTimes(1);
    });
  });
});
