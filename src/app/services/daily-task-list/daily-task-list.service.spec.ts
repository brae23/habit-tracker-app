import { TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DailyTaskListService } from './daily-task-list.service';

describe('DailyTaskListService', () => {
  let service: DailyTaskListService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [],
    }).compileComponents();

    service = TestBed.inject(DailyTaskListService);
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('Get list item', () => {
    it('should return list item if id exists', () => {
      // Arrange
      let id = service.dailyTaskList$().listItems[0].id;

      // Act
      let result = service.getListItem(id);

      // Assert
      expect(result()).toBeTruthy();
    });

    it('should return undefined if id exists', () => {
      // Arrange
      let id = 'bogus id';

      // Act
      let result = service.getListItem(id);

      // Assert
      expect(result()).toBeUndefined();
    });
  });

  // describe('Update List Item Completed State', () => {
  //     it('should update child list item if parent list id passed in', () => {
  //         // Arrange
  //         let parentList = service.dailyTaskList$().listItems.find((item) => item.listItems!.length > 0)!;
  //         let childTask = parentList.listItems![0];
  //         let expectedCompletedState = !childTask.completed;

  //         // Act
  //         service.updateListItemCompletedState(childTask.id, parentList.id, expectedCompletedState);
  //         let resultingTask =

  //         // Assert
  //         expect(service.dailyTaskList$().listItems.find).toEqual(expectedCompletedState);
  //     });
  // });
});
