import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputCustomEvent, IonicModule, ModalController } from '@ionic/angular';

import { NewTaskModalComponent } from './new-task-modal.component';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';
import { IListItem } from 'src/app/models/i-list-item';

describe('NewTaskModalComponent', () => {
  let component: NewTaskModalComponent;
  let fixture: ComponentFixture<NewTaskModalComponent>;
  let modalControllerMock: Partial<ModalController>;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;

  beforeEach(waitForAsync(() => {
    modalControllerMock = {
      dismiss: jasmine.createSpy('dismiss'),
    };

    dailyTaskListServiceMock = {
      addListItem: jasmine.createSpy('addListItem'),
    };

    TestBed.configureTestingModule({
      declarations: [NewTaskModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Action buttons', () => {
    it('should dismiss modal but not create new task if name is undefined', () => {
      // Arrange
      component.newTaskName = undefined;

      // Act
      component.saveClicked();

      // Assert
      expect(dailyTaskListServiceMock.addListItem).toHaveBeenCalledTimes(0);
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'confirm',
      );
    });

    it('should dismiss modal but not create new task if name is blank', () => {
      // Arrange
      component.newTaskName = '';

      // Act
      component.saveClicked();

      // Assert
      expect(dailyTaskListServiceMock.addListItem).toHaveBeenCalledTimes(0);
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'confirm',
      );
    });

    it('should dismiss modal and create new task if name has value', () => {
      // Arrange
      component.newTaskName = 'new task name';
      let newTaskItem: IListItem = {
        id: component.newTaskName,
        name: component.newTaskName,
        completed: false,
        isChildTask: false,
        createdByUserId: 'User 1',
      };

      // Act
      component.saveClicked();

      // Assert
      expect(dailyTaskListServiceMock.addListItem).toHaveBeenCalledOnceWith(
        newTaskItem,
      );
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'confirm',
      );
    });

    it('cancel clicked should dismiss modal', () => {
      // Act
      component.cancelClicked();

      // Assert
      expect(modalControllerMock.dismiss).toHaveBeenCalledOnceWith(
        null,
        'cancel',
      );
    });
  });

  it('should set name on name input event', () => {
    // Arrange
    let expectedNewTaskName = 'new task name';
    component.newTaskName = '';
    let event = {
      detail: {
        value: expectedNewTaskName,
      },
    } as InputCustomEvent;

    // Act
    component.setName(event);

    // Assert
    expect(component.newTaskName).toEqual(expectedNewTaskName);
  });
});
