import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DailyTaskListPage } from './daily-task-list.page';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

describe('DailyTaskListPage', () => {
  let component: DailyTaskListPage;
  let fixture: ComponentFixture<DailyTaskListPage>;
  let modalControllerMock: Partial<ModalController>;
  let datePipeMock: Partial<DatePipe>;

  beforeEach(waitForAsync(() => {
    datePipeMock = {
      transform: jasmine.createSpy('transform').and.returnValue(Date.now()),
    }

    TestBed.configureTestingModule({
      declarations: [ DailyTaskListPage ],
      imports: [],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
        { provide: DatePipe, useValue: datePipeMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTaskListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
