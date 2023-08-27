import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent  implements OnInit, OnDestroy {
  @Input('listItemId') listItemId: string;
  @Input('parentListItemId') parentListItemId: string;
  ngUnsub$: Subject<boolean> = new Subject<boolean>();
  dailyTaskList: TaskList;
  listItem: any;

  constructor(private modalCtl: ModalController, private dailyTaskListStateFacade: DailyTaskListStateFacade) { }

  ngOnInit() {
    this.dailyTaskListStateFacade.dailyTaskList$.pipe(takeUntil(this.ngUnsub$)).subscribe((x) => this.dailyTaskList = x);

    if (this.parentListItemId != null) {
      this.listItem = cloneDeep(this.dailyTaskList.listItems.find((y) => y.id === this.parentListItemId)?.listItems?.find((z: any) => z.id === this.listItemId)!);
    }
    else {
      this.listItem = cloneDeep(this.dailyTaskList.listItems.find((y) => y.id === this.listItemId)!);
    }
  }

  ngOnDestroy() {
    this.ngUnsub$.next(true);
    this.ngUnsub$.unsubscribe();
  }

  cancelClicked() {
    return this.modalCtl.dismiss(null, 'cancel');
  }

  confirmClicked() {
    this.dailyTaskListStateFacade.updateListItem(this.listItem);
    return this.modalCtl.dismiss(null, 'confirm');
  }

  setName(ev: InputCustomEvent) {
    this.listItem.name = ev.detail.value!;
  }

  setDueDate(ev: InputCustomEvent) {
    this.listItem.dueDate = ev.detail.value!;
  }
}
