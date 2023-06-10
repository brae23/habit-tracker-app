import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/interfaces/task-list';
import { Task } from 'src/app/interfaces/task';
import { ListItem } from 'src/app/interfaces/list-item';
import { Habit } from 'src/app/interfaces/habit';

@Component({
  selector: 'app-daily-task-list-page',
  templateUrl: './daily-task-list.page.html',
  styleUrls: ['./daily-task-list.page.scss'],
})
export class DailyTaskListPage implements OnInit {

  dailyTaskList: TaskList;

  constructor() {
  }

  ngOnInit() {
    this.getDailyTaskList();
  }

  onListItemClickedEvent(listItem: ListItem) {
    console.log(`${listItem.name} selected!`);
    listItem.completed = !listItem.completed;
    console.log(listItem.completed);
  }

  onNewTaskClicked() {
    console.log("New Task clicked");
  }

  private getDailyTaskList() {
    const habit1: Habit = {
      id: 'habitId1',
      name: 'Habit 1 Name',
      priority: 5,
      completed: false,
      parentListId: 'listId1',
      createdByUserId: 'User1',
      recursOn: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    };

    const testList1: TaskList = {
      id: 'listId1',
      name: 'Test Inset List 1',
      description: 'Mock Description',
      completed: false,
      priority: 1,
      totalTaskCount: 5,
      completedTaskCount: 2,
      createdByUserId: 'User 1',
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          priority: 1,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          priority: 2,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          priority: 3,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          priority: 4,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          priority: 5,
          completed: false,
          createdByUserId: 'User 1'
        }
      ]
    }
  

    this.dailyTaskList = {
      id: 'listId1',
      name: 'Daily Task List 1',
      description: 'Mock Description',
      completed: false,
      priority: 1,
      totalTaskCount: 5,
      completedTaskCount: 2,
      createdByUserId: 'User 1',
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          priority: 1,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          priority: 2,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          priority: 3,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          priority: 4,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          priority: 5,
          completed: false,
          createdByUserId: 'User 1'
        },
        habit1,
        testList1,
      ]
    }
  }
}
