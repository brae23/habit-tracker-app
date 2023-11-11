import { Injectable, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { Habit } from 'src/app/models/habit';
import { TaskList } from 'src/app/models/task-list';
import { IListItem } from 'src/app/models/i-list-item';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { findListItemArray } from 'src/app/functions/find-list.function';
import { toTask } from 'src/app/functions/to-task.function';

@Injectable({
  providedIn: 'root',
})
export class DailyTaskListState implements OnInit {

  public dailyTaskList: WritableSignal<TaskList>;

  constructor() {}

  ngOnInit(): void {
    this.dailyTaskList = signal(this.getMockDailyTaskListState());
  }

  updateListItemCompletedState(
    listItemId: string,
    parentListId: string | undefined = undefined,
    completed: boolean,
  ): void {
    if (parentListId) {
      this.dailyTaskList.update(taskList => {
        let parentList = taskList.listItems.find(x => x.id === parentListId);
        let listItem = parentList?.listItems?.find(x => x.id === listItemId);
        listItem.completed = completed;
        return taskList;
      })
    } else {
      this.dailyTaskList.update(taskList => {
        let listItem = taskList.listItems.find(x => x.id === listItemId);
        listItem!.completed = completed;
        return taskList;
      });
    }
  }

  updateListItem(
    updatedListItem: IListItem,
    parentListId: string | undefined = undefined,
  ): void {
    if (parentListId) {
      this.dailyTaskList.update(taskList => {
        let parentList: IListItem = taskList.listItems.find(x => x.id === parentListId)!;
        let oldListItemIndex: number = parentList?.listItems?.findIndex(x => x.id === updatedListItem.id)!;
        parentList?.listItems?.splice(oldListItemIndex, 1, updatedListItem);
        return taskList;
      })
    } else {
      this.dailyTaskList.update(taskList => {
        let oldListItemIndex: number = taskList.listItems.findIndex(x => x.id === updatedListItem.id)!;
        taskList.listItems.splice(oldListItemIndex, 1, updatedListItem);
        return taskList;
      });
    }
  }

  addListItem(
    listItem: IListItem,
    parentListId: string | undefined = undefined,
  ): void {
    if (parentListId) {
      this.dailyTaskList.update(taskList => {
        let parentList = taskList.listItems.find(x => x.id === parentListId);
        parentList?.listItems?.push(listItem);
        return taskList;
      })
    } else {
      this.dailyTaskList.update(taskList => {
        taskList.listItems.push(listItem)
        return taskList;
      })
    }
  }

  removeListItem(
    listItemId: string,
    parentListId: string | undefined = undefined,
  ): void {
    if (parentListId) {
      this.dailyTaskList.update(taskList => {
        let parentList = taskList.listItems.find(x => x.id === parentListId);
        parentList?.listItems?.filter(x => x.id !== listItemId);
        return taskList;
      })
    } else {
      this.dailyTaskList.update(taskList => {
        taskList.listItems.filter(x => x.id !== listItemId);
        return taskList;
      })
    }
  }

  handleItemIndexReorder(
    ev: CdkDragDrop<IListItem[]>,
  ): void {
    let listId = ev.container.id;
    let previousListId = ev.previousContainer.id;

    this.dailyTaskList.update(taskList => {
      if (ev.previousContainer === ev.container) {
        moveItemInArray(
          findListItemArray(taskList, listId)!,
          ev.previousIndex,
          ev.currentIndex,
        );
      } else {
        let previousList = findListItemArray(
          taskList,
          previousListId,
        );
        transferArrayItem(
          previousList!,
          findListItemArray(taskList, listId)!,
          ev.previousIndex,
          ev.currentIndex,
        );
        if (previousList!.length == 0) {
          taskList.listItems.map((x) =>
            x.id == previousListId ? toTask(previousList) : x,
          );
        }
      }

      return taskList;
    });
  }

  private getMockDailyTaskListState(): TaskList {
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
      id: 'insetListId1',
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
}
