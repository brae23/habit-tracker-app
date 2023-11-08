import { Component, Input } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { DefaultTask } from 'src/app/models/task';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent {
  @Input() listItem: IListItem;
  newSubtaskPopupHeader: string;
  confirmationPopupHeader: string;
  nameUpdate: string;

  public newSubtaskPopupInputs = [
    {
      placeholder: 'New Subtask Name'
    }
  ]
  public newSubtaskPopupButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Save',
      role: 'confirm',
      cssClass: 'alert-button-save',
    }
  ]

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
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
  ) {
    this.newSubtaskPopupHeader = "New Subtask";
    this.confirmationPopupHeader = 'Are you sure?';
  }

  cancelClicked() {
    this.modalCtl.dismiss(null, 'cancel');
  }

  saveClicked() {
    if (this.nameUpdate) {
      let listItemClone = cloneDeep(this.listItem);
      listItemClone.name = this.nameUpdate;
      this.dailyTaskListStateFacade.updateListItem(listItemClone);
    }
    
    this.modalCtl.dismiss(null, 'confirm');
  }

  setName(ev: InputCustomEvent) {
    this.nameUpdate = ev.detail.value!;
  }

  onDeletePopupDismissed(ev: any) {
    if (ev.detail.role === 'confirm') {
        this.dailyTaskListStateFacade.removeListItem(this.listItem.id);
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
      this.dailyTaskListStateFacade.addInsetListItem(newSubtaskItem, this.listItem.id);

      this.modalCtl.dismiss(null, 'confirm');
    }
  }
}
