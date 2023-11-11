import { CdkDropList } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTaskModalComponent } from 'src/app/components/daily-task-list/new-task-modal/new-task-modal.component';
import { DailyTaskListState } from 'src/app/data-access/+state/daily-task-list/daily-task-list.state';
import { IListItem } from 'src/app/models/i-list-item';

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
  dailyTaskList: any;

  constructor(
    public state: DailyTaskListState,
    private modalCtl: ModalController,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.title = this.datePipe.transform(Date.now(), 'mediumDate')!;
    this.dailyTaskList = this.state.dailyTaskList();
  }

  async onNewTaskClicked() {
    let editTaskModal = await this.modalCtl.create({
      component: NewTaskModalComponent,
    });

    editTaskModal.present();
  }
}
