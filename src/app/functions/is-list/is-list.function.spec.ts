import { getMockListItem } from 'src/test/daily-task-list.service.utils';
import { isList } from './is-list.function';

describe('Is List Function', () => {
  it('should return true if list', () => {
    // Arrange
    let listItem = getMockListItem(true);

    // Act
    let result = isList(listItem);

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false if not list', () => {
    // Arrange
    let listItem = getMockListItem(false);

    // Act
    let result = isList(listItem);

    // Assert
    expect(result).toBeFalse();
  });
});
