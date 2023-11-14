import { Component, Input, Signal } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { IListItem } from 'src/app/models/i-list-item';
import { DefaultTask } from 'src/app/models/task';
import { DailyTaskListService } from 'src/app/services/daily-task-list.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  @Input() listItem: Signal<IListItem>;
  newSubtaskPopupHeader: string;
  confirmationPopupHeader: string;
  nameUpdate: string;

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
    private dailyTaskListService: DailyTaskListService,
  ) {
    this.newSubtaskPopupHeader = 'New Subtask';
    this.confirmationPopupHeader = 'Are you sure?';
  }

  cancelClicked() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  saveClicked() {
    if (this.nameUpdate) {
      let listItemClone = cloneDeep(this.listItem());
      listItemClone.name = this.nameUpdate;
      this.dailyTaskListService.updateListItem(listItemClone);
    }

    this.modalCtl.dismiss(null, 'confirm');
  }

  setName(ev: InputCustomEvent) {
    this.nameUpdate = ev.detail.value!;
  }

  onDeletePopupDismissed(ev: any) {
    console.log(this.listItem);
    if (ev.detail.role === 'confirm') {
      if (this.listItem().isChildTask) {
        this.dailyTaskListService.removeListItem(
          this.listItem().id,
          this.listItem().parentListId!,
        );
      } else {
        this.dailyTaskListService.removeListItem(this.listItem().id);
      }

      this.modalCtl.dismiss(null, 'cancel');
    }
  }

  onNewTaskPopupDismissed(ev: any) {
    if (ev.detail.role === 'confirm') {
      let newSubtaskItemName = ev.detail.data.values[0];

      if (newSubtaskItemName.length < 1) {
        return;
      }

      let newSubtaskItem: IListItem = DefaultTask;
      newSubtaskItem.name = newSubtaskItemName;
      newSubtaskItem.isChildTask = true;

      this.dailyTaskListService.addListItem(newSubtaskItem, this.listItem().id);

      this.modalCtl.dismiss(null, 'confirm');
    }
  }
}
