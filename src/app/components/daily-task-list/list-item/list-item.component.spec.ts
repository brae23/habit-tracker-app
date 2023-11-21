import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { ListItemComponent } from './list-item.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop/nested-drag-drop.service';
import { WritableSignal, signal } from '@angular/core';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { IListItem } from 'src/app/models/i-list-item';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let modalControllerMock: Partial<ModalController>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;
  let nestedDragDropServiceMock: Partial<NestedDragDropService>;
  let listItemMock: WritableSignal<IListItem>;
  let editModalMock: HTMLIonModalElement;

  beforeEach(waitForAsync(() => {
    listItemMock = signal(getMockDailyTaskList().listItems[0]);

    dailyTaskListServiceMock = {
      getListItem: jasmine
        .createSpy('getListItem')
        .and.returnValue(listItemMock),
      updateListItemCompletedState: jasmine.createSpy(
        'updateListItemCompletedState',
      ),
    };

    nestedDragDropServiceMock = {
      dragMoved: jasmine.createSpy('dragMoved'),
      dragReleased: jasmine.createSpy('dragReleased'),
    };

    editModalMock = {
      present: () => {
        return Promise.resolve();
      },
    } as HTMLIonModalElement;

    modalControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(editModalMock),
    };

    TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
        { provide: NestedDragDropService, useValue: nestedDragDropServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set completed state on init', () => {
    // Arrange
    let expectedCompletedState = listItemMock().completed;

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isListItemCompleted()).toEqual(expectedCompletedState);
  });

  it('should update list item completed state on list item clicked event', () => {
    // Arrange
    let expectedCompletedState = !listItemMock().completed;
    let expectedListItemId = listItemMock().id;
    component.listItemId = expectedListItemId;

    // Act
    component.onListItemClickedEvent();

    // Assert
    expect(
      dailyTaskListServiceMock.updateListItemCompletedState,
    ).toHaveBeenCalledOnceWith(
      expectedListItemId,
      undefined,
      expectedCompletedState,
    );
  });

  describe('Drag and drop', () => {
    it('should call drag moved method on item dragged', () => {
      // Arrange
      let event = {} as CdkDragMove<IListItem>;

      // Act
      component.dragMoved(event);

      // Assert
      expect(nestedDragDropServiceMock.dragMoved).toHaveBeenCalledTimes(1);
    });

    it('should call drag released method on drag released', () => {
      // Arrange
      let event = {} as CdkDragRelease;

      // Act
      component.dragReleased(event);

      // Assert
      expect(nestedDragDropServiceMock.dragReleased).toHaveBeenCalledTimes(1);
    });
  });

  it('should open edit task modal on edit clicked', async () => {
    // Arrange
    let expectedModalData = {
      component: EditTaskModalComponent,
      componentProps: {
        ['listItem']: component.listItem,
      },
    };
    spyOn<any>(editModalMock, 'present');

    // Act
    await component.itemEditClicked();

    // Assert
    expect(modalControllerMock.create).toHaveBeenCalledWith(expectedModalData);
    expect(editModalMock.present).toHaveBeenCalledTimes(1);
  });
});
