import { Component, OnInit } from '@angular/core';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-lists-home',
  templateUrl: './lists-home.page.html',
  styleUrls: ['./lists-home.page.scss'],
})
export class ListsHomePage implements OnInit {
  title: string;
  listsList: TaskList[];

  constructor() { }

  ngOnInit() {
    this.title = 'Lists';

    const testList1: TaskList = {
      id: 'listsPageList1',
      name: 'Test List 1',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: true,
      createdByUserId: 'User 1',
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1'
        }
      ]
    };

    const testList2: TaskList = {
      id: 'listsPageList2',
      name: 'Test List 2',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: true,
      createdByUserId: 'User 1',
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1'
        }
      ]
    }

    const testList3: TaskList = {
      id: 'listsPageList3',
      name: 'Test List 3',
      description: 'Mock Description',
      createdDate: Date.now(),
      completed: false,
      isCollapsed: true,
      createdByUserId: 'User 1',
      listItems: [
        {
          id: 'taskId1',
          parentListId: 'listId1',
          name: 'Task 1 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId2',
          parentListId: 'listId1',
          name: 'Task 2 Name',
          completed: false,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId3',
          parentListId: 'listId1',
          name: 'Task 3 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId4',
          parentListId: 'listId1',
          name: 'Task 4 Name',
          completed: true,
          createdByUserId: 'User 1'
        },
        {
          id: 'taskId5',
          parentListId: 'listId1',
          name: 'Task 5 Name',
          completed: false,
          createdByUserId: 'User 1'
        }
      ]
    };   

    this.listsList = [
      testList1,
      testList2,
      testList3
    ];
  }

  onNewListClicked() {
    console.log('New List Clicked!');
  }
}
