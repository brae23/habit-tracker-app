import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DailyTaskListPage } from './daily-task-list.page';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { NewTaskModalComponent } from 'src/app/components/daily-task-list/new-task-modal/new-task-modal.component';

describe('DailyTaskListPage', () => {
  let component: DailyTaskListPage;
  let fixture: ComponentFixture<DailyTaskListPage>;
  let modalControllerMock: Partial<ModalController>;
  let datePipeMock: Partial<DatePipe>;
  let newTaskModal: HTMLIonModalElement;

  beforeEach(waitForAsync(() => {
    datePipeMock = {
      transform: jasmine.createSpy('transform'),
    };

    newTaskModal = {
      present: () => {
        return Promise.resolve();
      },
    } as HTMLIonModalElement;

    modalControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(newTaskModal),
    };

    TestBed.configureTestingModule({
      declarations: [DailyTaskListPage],
      imports: [],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
        { provide: DatePipe, useValue: datePipeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set date text on init', () => {
    // Act - happens in test setup

    // Assert
    expect(datePipeMock.transform).toHaveBeenCalledTimes(1);
  });

  it('should create and present new task modal on new task clicked event', async () => {
    // Arrange
    let expectedCreateModalData = {
      component: NewTaskModalComponent,
    };
    spyOn<any>(newTaskModal, 'present');

    // Act
    await component.onNewTaskClicked();

    // Assert
    expect(modalControllerMock.create).toHaveBeenCalledOnceWith(
      expectedCreateModalData,
    );
    expect(newTaskModal.present).toHaveBeenCalledTimes(1);
  });
});
