import { toTask } from './to-task.function';

describe('To Task Function', () => {
  it('should return task with valid data', () => {
    // Arrange
    let data = {
      id: 'test',
      name: 'test',
      completed: true,
      createdByUserId: 'test',
      parentListId: 'test',
    };
    let expectedListItem = {
      id: data.id,
      name: data.name,
      completed: data.completed,
      createdByUserId: data.createdByUserId,
      parentListId: data.parentListId,
      isChildTask: false,
    };

    // Act
    let result = toTask(data);

    // Assert
    expect(result).toEqual(expectedListItem);
  });
});
