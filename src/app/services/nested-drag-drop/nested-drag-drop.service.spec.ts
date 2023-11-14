import { TestBed, waitForAsync } from '@angular/core/testing';
import { NestedDragDropService } from './nested-drag-drop.service';
import { IonicModule } from '@ionic/angular';
import { DailyTaskListService } from '../daily-task-list/daily-task-list.service';

describe('NestedDragDropService', () => {
  let service: NestedDragDropService;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DailyTaskListService, useValue: dailyTaskListServiceMock },
      ],
    }).compileComponents();

    service = TestBed.inject(NestedDragDropService);
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
