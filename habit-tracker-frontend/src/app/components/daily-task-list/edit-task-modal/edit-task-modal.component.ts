import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent  implements OnInit {
  @Input('listItemId') listItemId: string;
  @Input('parentListItemId') parentListItemId: string;
  dailyTaskList: TaskList;
  listItem: IListItem;

  constructor(private modalCtl: ModalController, private dailyTaskListStateFacade: DailyTaskListStateFacade) { }

  ngOnInit() {
    this.dailyTaskListStateFacade.dailyTaskList$.subscribe((x) => this.dailyTaskList = x);

    if (this.parentListItemId != null) {
      this.listItem = this.dailyTaskList.listItems.find((y) => y.id === this.parentListItemId)?.listItems?.find((z) => z.id === this.listItemId)!;
    }
    else {
      this.listItem = this.dailyTaskList.listItems.find((y) => y.id === this.listItemId)!;
    }
  }

  cancelClicked() {
    return this.modalCtl.dismiss(null, 'cancel');
  }

  confirmClicked() {
    return this.modalCtl.dismiss(null, 'confirm');
  }

}
