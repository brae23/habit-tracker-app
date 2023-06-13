import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';
import { IListItem } from 'src/app/models/i-list-item';
import { Habit } from 'src/app/models/habit';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-daily-task-list-page',
  templateUrl: './daily-task-list.page.html',
  styleUrls: ['./daily-task-list.page.scss'],
})
export class DailyTaskListPage implements OnInit {

  testUserId: string = 'TestUserId1';

  constructor(public dailyTaskListStateFacade: DailyTaskListStateFacade) {
  }

  ngOnInit() {
    this.dailyTaskListStateFacade.loadDailyTaskList(this.testUserId);
  }

  onNewTaskClicked() {
    console.log("New Task clicked");
  }
}
