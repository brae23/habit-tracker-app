import { Component, OnInit } from '@angular/core';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';

@Component({
  selector: 'app-daily-task-list-page',
  templateUrl: './daily-task-list.page.html',
  styleUrls: ['./daily-task-list.page.scss'],
})
export class DailyTaskListPage implements OnInit {

  testUserId: string = 'TestUserId1';
  isEditMode: boolean = false;
  isAddFabOpen: boolean = false;
  listReorderingTemp: IListItem;

  constructor(public dailyTaskListStateFacade: DailyTaskListStateFacade) {
  }

  ngOnInit() {
    this.dailyTaskListStateFacade.loadDailyTaskList(this.testUserId);
  }

  onAddFabOpen() {
    this.isAddFabOpen = true;
  }

  onNewTaskClicked() {
    this.isAddFabOpen = false;
  }

  onEditFabClicked() {
    this.isEditMode = !this.isEditMode;
  }
}
