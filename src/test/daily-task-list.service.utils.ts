import { Habit } from 'src/app/models/habit';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

/* Istanbul ignore next */
export function getMockDailyTaskList(): TaskList {
  const habit1: Habit = {
    id: 'habitId1',
    name: 'Habit 1 Name',
    priority: 6,
    completed: false,
    parentListId: 'listId1',
    createdByUserId: 'User1',
    recursOn: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isChildTask: false,
  };

  const testList1: TaskList = {
    id: 'uniqueInsetListId1',
    name: 'Test Inset List 1',
    description: 'Mock Description',
    createdDate: Date.now(),
    completed: false,
    isCollapsed: true,
    createdByUserId: 'User 1',
    isChildTask: false,
    listItems: [
      {
        id: 'taskId1',
        parentListId: 'insetListId1',
        name: 'Task 1 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId2',
        parentListId: 'insetListId1',
        name: 'Task 2 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId3',
        parentListId: 'insetListId1',
        name: 'Task 3 Name',
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId4',
        parentListId: 'insetListId1',
        name: 'Task 4 Name',
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId5',
        parentListId: 'insetListId1',
        name: 'Task 5 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
    ],
  };

  const testList2: TaskList = {
    id: 'insetListId2',
    name: 'Test Inset List 2',
    description: 'Mock Description',
    createdDate: Date.now(),
    completed: false,
    isCollapsed: true,
    createdByUserId: 'User 1',
    isChildTask: false,
    listItems: [
      {
        id: 'taskId1',
        parentListId: 'insetListId2',
        name: 'Task 1 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId2',
        parentListId: 'insetListId2',
        name: 'Task 2 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId3',
        parentListId: 'insetListId2',
        name: 'Task 3 Name',
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId4',
        parentListId: 'insetListId2',
        name: 'Task 4 Name',
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
      {
        id: 'taskId5',
        parentListId: 'insetListId2',
        name: 'Task 5 Name',
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: true,
      },
    ],
  };

  const dailyTaskList = {
    id: 'dtListId1',
    name: 'Daily Task List 1',
    description: 'Mock Description',
    createdDate: Date.now(),
    completed: false,
    isCollapsed: false,
    priority: 0,
    totalTaskCount: 5,
    completedTaskCount: 2,
    createdByUserId: 'User 1',
    isChildTask: false,
    listItems: [
      {
        id: 'taskId1',
        parentListId: 'listId1',
        name: 'Task 1 Name',
        priority: 0,
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: false,
      },
      {
        id: 'taskId2',
        parentListId: 'listId1',
        name: 'Task 2 Name',
        priority: 1,
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: false,
      },
      {
        id: 'taskId3',
        parentListId: 'listId1',
        name: 'Task 3 Name',
        priority: 2,
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: false,
      },
      {
        id: 'taskId4',
        parentListId: 'listId1',
        name: 'Task 4 Name',
        priority: 3,
        completed: true,
        createdByUserId: 'User 1',
        isChildTask: false,
      },
      testList1,
      testList2,
      {
        id: 'taskId5',
        parentListId: 'listId1',
        name: 'Task 5 Name',
        priority: 5,
        completed: false,
        createdByUserId: 'User 1',
        isChildTask: false,
      },
      habit1,
    ],
  };

  return dailyTaskList;
}

/* Istanbul ignore next */
export function getMockListItem(shouldBeList: boolean): IListItem {
  if (shouldBeList) {
    return {
      id: 'uniqueInsetListId1',
      name: 'Test Inset List 1',
      completed: false,
      createdByUserId: 'User 1',
      isChildTask: false,
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'insetListId1',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId2',
          parentListId: 'insetListId1',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId3',
          parentListId: 'insetListId1',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId4',
          parentListId: 'insetListId1',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
        {
          id: 'taskId5',
          parentListId: 'insetListId1',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1',
          isChildTask: true,
        },
      ],
    };
  } else {
    return {
      id: 'taskId5',
      parentListId: 'insetListId1',
      name: 'Task 5 Name',
      completed: false,
      createdByUserId: 'User 1',
      isChildTask: true,
    };
  }
}
