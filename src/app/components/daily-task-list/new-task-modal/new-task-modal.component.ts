import { Component } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent {
  newTaskName: string;

  constructor(
    private modalCtl: ModalController,
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
  ) {}

  saveClicked() {
    if (this.newTaskName) {
      let newTaskItem: IListItem = {
        id: this.newTaskName,
        name: this.newTaskName,
        completed: false,
        isChildTask: false,
        createdByUserId: 'User 1',
      };
      this.dailyTaskListStateFacade.addListItem(newTaskItem);
    }

    this.modalCtl.dismiss(null, 'confirm');
  }

  cancelClicked() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  setName(ev: InputCustomEvent) {
    this.newTaskName = ev.detail.value!;
  }
}
