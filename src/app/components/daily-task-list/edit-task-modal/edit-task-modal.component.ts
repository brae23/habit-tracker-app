import { AfterContentInit, AfterViewInit, Component, Input, Signal } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { isList } from 'src/app/functions/is-list/is-list.function';
import { IListItem } from 'src/app/models/i-list-item';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  @Input() task: Task;
  newSubtaskPopupHeader: string;
  confirmationPopupHeader: string;
  nameUpdate: string | undefined;
  headerTitle: string = 'Edit Task';

  public newSubtaskPopupInputs = [
    {
      placeholder: 'New Subtask Name',
    },
  ];
  public newSubtaskPopupButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Save',
      role: 'confirm',
      cssClass: 'alert-button-save',
    },
  ];

  public confirmationPopupButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'confirm',
      cssClass: 'alert-button-delete',
    },
  ];

  constructor(
    private modalCtl: ModalController,
    private taskService: TaskService
  ) {
    this.newSubtaskPopupHeader = 'New Subtask';
    this.confirmationPopupHeader = 'Are you sure?';
  }

  cancelClicked(): void {
    this.modalCtl.dismiss(null, 'cancel');
  }

  saveClicked(): void {
    if (this.nameUpdate && this.nameUpdate !== this.task.name) {
      let taskClone = cloneDeep(this.task);
      taskClone.name = this.nameUpdate;
      this.taskService.updateTask(taskClone);
    }

    this.modalCtl.dismiss(null, 'confirm');
  }

  setName(ev: InputCustomEvent): void {
    this.nameUpdate = ev.detail.value!;
  }

  onDeletePopupDismissed(ev: any): void {
    if (ev.detail.role === 'confirm') {
      this.taskService.deleteTask(this.task.id);

      this.modalCtl.dismiss(null, 'confirm');
    }
  }

  onNewTaskPopupDismissed(ev: any): void {
    if (ev.detail.role === 'confirm') {
      // let newSubtaskItemName = ev.detail.data.values[0];

      // if (newSubtaskItemName.length < 1) {
      //   return;
      // }

      // let newSubtaskItem: Task = DefaultTask;
      // newSubtaskItem.name = newSubtaskItemName;
      // newSubtaskItem.isChildTask = true;

      // this.dailyTaskListService.addListItem(newSubtaskItem, this.listItem().id);

      this.modalCtl.dismiss(null, 'confirm');
    }
  }
}
