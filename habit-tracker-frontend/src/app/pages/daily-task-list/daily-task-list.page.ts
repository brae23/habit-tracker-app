import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';
import { Task } from 'src/app/models/task';

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

  onTaskClickedEvent(task: Task) {
    console.log(`${task.name} selected!`);
    task.completed = !task.completed;
    console.log(task.completed);
  }

  private getDailyTaskList() {
    this.dailyTaskList = {
      id: 'listId1',
      description: 'Mock Description',
      type: 1,
      totalTaskCount: 3,
      completedTaskCount: 1,
      createdByUserId: 'User 1',
      tasks: [
        {
          id: 'taskId1',
          listId: 'listId1',
          name: 'Task 1 Name',
          type: 1,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          listId: 'listId1',
          name: 'Task 2 Name',
          type: 1,
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          listId: 'listId1',
          name: 'Task 3 Name',
          type: 1,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          listId: 'listId1',
          name: 'Task 4 Name',
          type: 1,
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          listId: 'listId1',
          name: 'Task 5 Name',
          type: 1,
          completed: false,
          createdByUserId: 'User 1'
        },
      ]
    }
  }

}
