import { Component } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { IListItem } from 'src/app/models/i-list-item';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DailyTaskListService } from 'src/app/services/daily-task-list/daily-task-list.service';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss'],
})
export class NewTaskModalComponent {
  newTaskName: string | undefined;

  constructor(
    private modalCtl: ModalController,
    private dailyTaskListService: DailyTaskListService,
    private authService: AuthService,
  ) {}

  saveClicked() {
    if (this.newTaskName && this.newTaskName.length > 0) {
      let newTaskItem: IListItem = {
        id: this.newTaskName,
        name: this.newTaskName,
        completed: false,
        isChildTask: false,
        createdByUserName: this.authService.user$()?.userName!,
      };
      this.dailyTaskListService.addListItem(newTaskItem);
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
