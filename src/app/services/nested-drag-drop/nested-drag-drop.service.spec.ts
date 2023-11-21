import { TestBed, waitForAsync } from '@angular/core/testing';
import { NestedDragDropService } from './nested-drag-drop.service';
import { IonicModule } from '@ionic/angular';
import { DailyTaskListService } from '../daily-task-list/daily-task-list.service';
import {
  CdkDragDrop,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';

describe('NestedDragDropService', () => {
  let service: NestedDragDropService;
  let dailyTaskListServiceMock: Partial<DailyTaskListService>;

  beforeEach(waitForAsync(() => {
    dailyTaskListServiceMock = {
      handleItemIndexReorder: jasmine.createSpy('handleItemIndexReorder'),
    };

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

  describe('Register', () => {
    it('should register droplist to droplist list', () => {
      // Arrange
      let startingDroplistCount = service.dropLists$().length;
      let newDropList = {} as CdkDropList;

      // Act
      service.register(newDropList);

      // Assert
      expect(service.dropLists$().length).toEqual(startingDroplistCount + 1);
    });
  });

  describe('Unregister', () => {
    it('should remove list from droplist if it exists', () => {
      // Arrange
      let newDropList = { id: 'test' } as CdkDropList;
      service.dropLists$ = signal([newDropList]);
      let startingDroplistCount = service.dropLists$().length;

      // Act
      service.unregister(newDropList);

      // Assert
      expect(service.dropLists$().length).toEqual(startingDroplistCount - 1);
      expect(service.dropLists$().includes(newDropList)).toBeFalse();
    });

    it('should remove nothing from  the list if supplied list does not exist', () => {
      // Arrange
      let newDropList = { id: 'test' } as CdkDropList;
      service.dropLists$ = signal([newDropList]);
      let startingDroplistCount = service.dropLists$().length;

      // Act
      service.unregister({ id: 'bogus' } as CdkDropList);

      // Assert
      expect(service.dropLists$().length).toEqual(startingDroplistCount);
      expect(service.dropLists$().includes(newDropList)).toBeTrue();
    });
  });

  describe('Drop', () => {
    it('should handle item index reorder', () => {
      // Arrange
      let event = {} as CdkDragDrop<IListItem[]>;

      // Act
      service.drop(event);

      // Assert
      expect(
        dailyTaskListServiceMock.handleItemIndexReorder,
      ).toHaveBeenCalledOnceWith(event);
    });
  });
});
