import { CdkDropList } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditTaskModalComponent } from 'src/app/components/daily-task-list/edit-task-modal/edit-task-modal.component';
import { NewTaskModalComponent } from 'src/app/components/daily-task-list/new-task-modal/new-task-modal.component';
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
  listReorderingTemp: IListItem;
  title: string;

  constructor(
    public dailyTaskListStateFacade: DailyTaskListStateFacade,
    private modalCtl: ModalController,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.dailyTaskListStateFacade.loadDailyTaskList(this.testUserId);
    this.title = this.datePipe.transform(Date.now(), 'mediumDate')!;
  }

  async onNewTaskClicked() {
    let editTaskModal = await this.modalCtl.create({
      component: NewTaskModalComponent,
    });

    editTaskModal.present();
  }
}
