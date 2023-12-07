import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputCustomEvent, IonicModule, ModalController } from '@ionic/angular';

import { EditTaskModalComponent } from './edit-task-modal.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { WritableSignal, signal } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';
import { IListItem } from 'src/app/models/i-list-item';
import { cloneDeep } from 'lodash';
import { DefaultTask } from 'src/app/models/task';

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
      updateListItem: jasmine.createSpy('updateListItem'),
      getListItem: jasmine.createSpy('getListItem'),
      removeListItem: jasmine.createSpy('removeListItem'),
      addListItem: jasmine.createSpy('addListItem'),
    };

    modalControllerMock = {
      dismiss: jasmine.createSpy('dismiss'),
    };

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

  it('should set name on name entered event', () => {
    // Arrange
    let nameUpdate = 'name update';
    component.nameUpdate = 'test name';
    let updateEvent = {
      detail: {
        value: 'name update',
      },
    } as InputCustomEvent;

    // Act
    component.setName(updateEvent);

    // Assert
    expect(component.nameUpdate).toEqual(nameUpdate);
  });

  describe('Modal Buttons', () => {
    it('should close modal on cancel click', () => {
      // Act
      component.cancelClicked();

      // Assert
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'cancel',
      );
    });

    it('should close modal on save clicked', () => {
      // Arrange
      component.nameUpdate = undefined;

      // Act
      component.saveClicked();

      // Assert
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'confirm',
      );
    });

    it('should update name if different name entered on save clicked', () => {
      // Arrange
      let nameUpdate = 'New Name';
      component.nameUpdate = nameUpdate;
      let listItem = cloneDeep(dailyTaskListMock().listItems[0]);
      listItem.name = nameUpdate;

      // Act
      component.saveClicked();

      // Assert
      expect(dailyTaskListServiceMock.updateListItem).toHaveBeenCalledOnceWith(
        listItem,
      );
    });

    it('should not update name if same name entered on save clicked', () => {
      // Arrange
      let listItemName = dailyTaskListMock().listItems[0].name;
      component.nameUpdate = listItemName;

      // Act
      component.saveClicked();

      // Assert
      expect(dailyTaskListServiceMock.updateListItem).toHaveBeenCalledTimes(0);
    });
  });

  describe('Popup actions', () => {
    describe('Delete popup', () => {
      it('should not dismiss modal if delete popup not confirmed', () => {
        // Arrange
        let event = {
          detail: {
            role: 'cancel',
          },
        };

        // Act
        component.onDeletePopupDismissed(event);

        // Assert
        expect(modalControllerMock.dismiss).toHaveBeenCalledTimes(0);
      });

      it('should dismiss modal and call remove list item without parentListId if not child task when delete popup confirmed', () => {
        // Arrange
        let event = {
          detail: {
            role: 'confirm',
          },
        };
        let listItem = cloneDeep(dailyTaskListMock().listItems[0]);
        listItem.isChildTask = false;
        component.listItem = signal(listItem);

        // Act
        component.onDeletePopupDismissed(event);

        // Assert
        expect(
          dailyTaskListServiceMock.removeListItem,
        ).toHaveBeenCalledOnceWith(listItem.id);
        expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
          null,
          'confirm',
        );
      });

      it('should dismiss modal and call remove list item with parentListId if child task when delete popup confirmed', () => {
        // Arrange
        let event = {
          detail: {
            role: 'confirm',
          },
        };
        let listItem = cloneDeep(dailyTaskListMock().listItems[0]);
        listItem.isChildTask = true;
        component.listItem = signal(listItem);

        // Act
        component.onDeletePopupDismissed(event);

        // Assert
        expect(
          dailyTaskListServiceMock.removeListItem,
        ).toHaveBeenCalledOnceWith(listItem.id, listItem.parentListId);
        expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
          null,
          'confirm',
        );
      });
    });

    describe('New task popup', () => {
      it('should not dismiss modal on popup canceled', () => {
        // Arrange
        let event = {
          detail: {
            role: 'cancel',
          },
        };

        // Act
        component.onNewTaskPopupDismissed(event);

        // Assert
        expect(modalControllerMock.dismiss).toHaveBeenCalledTimes(0);
      });

      it('should not dismiss modal and not add new task if blank name entered', () => {
        // Arrange
        let newName = '';
        let event = {
          detail: {
            role: 'confirm',
            data: {
              values: [newName],
            },
          },
        };

        // Act
        component.onNewTaskPopupDismissed(event);

        // Assert
        expect(modalControllerMock.dismiss).toHaveBeenCalledTimes(0);
        expect(dailyTaskListServiceMock.addListItem).toHaveBeenCalledTimes(0);
      });

      it('should dismiss modal and add new task if valid name entered', () => {
        // Arrange
        let newName = 'New Name 1';
        let event = {
          detail: {
            role: 'confirm',
            data: {
              values: [newName],
            },
          },
        };
        let newTask: IListItem = DefaultTask;
        newTask.name = newName;
        newTask.isChildTask = true;
        newTask.parentListId = component.listItem().id;

        // Act
        component.onNewTaskPopupDismissed(event);

        // Assert
        expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
          null,
          'confirm',
        );
        expect(dailyTaskListServiceMock.addListItem).toHaveBeenCalledOnceWith(
          newTask,
          component.listItem().id,
        );
      });
    });
  });
});
