import { CdkDropList } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { DefaultTask } from 'src/app/models/task';

@Component({
  selector: 'app-daily-task-list-page',
  templateUrl: './daily-task-list.page.html',
  styleUrls: ['./daily-task-list.page.scss'],
})
export class DailyTaskListPage implements OnInit {
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  testUserId: string = 'TestUserId1';
  isEditMode: boolean = false;
  listReorderingTemp: IListItem;
  title: string;

  constructor(
    public dailyTaskListStateFacade: DailyTaskListStateFacade,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.dailyTaskListStateFacade.loadDailyTaskList(this.testUserId);
    this.title = this.datePipe.transform(Date.now(), 'mediumDate')!;
  }

  onNewTaskClicked() {
    this.dailyTaskListStateFacade.addListItem(DefaultTask);
  }

  onEditFabClicked() {
    this.isEditMode = !this.isEditMode;
  }
}
