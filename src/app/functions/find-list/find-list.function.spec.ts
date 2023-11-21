import { getMockDailyTaskList } from 'src/test/daily-task-list.service.utils';
import { TaskList } from '../../models/task-list';
import { findListItemArray } from './find-list.function';
import { IListItem } from '../../models/i-list-item';

describe('FindList Function', () => {
  let taskList: TaskList = getMockDailyTaskList();

  it('should return task list if id matches', () => {
    // Arrange
    let id = taskList.id;

    // Act
    let result = findListItemArray(taskList, id);

    // expect
    expect(result).toEqual(taskList.listItems);
  });

  it('should return list if matching list id exists', () => {
    // Arrange
    let id = '';
    let listItems: IListItem[] = [];
    taskList.listItems.forEach((item) => {
      if (id.length == 0) {
        if (item.listItems && item.listItems!.length > 0) {
          id = item.id;
          listItems = item.listItems!;
        }
      }
    });

    // Act
    let result = findListItemArray(taskList, id);

    // Assert
    expect(result).toEqual(listItems);
  });

  it('should return undefined if no matching list exists', () => {
    // Arrange
    let id = 'bogus id';

    // Act
    let result = findListItemArray(taskList, id);

    // Assert
    expect(result).toBeUndefined();
  });
});
