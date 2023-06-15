import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit {

  @Input() taskList: any;
  @Input() isEditMode: boolean;
  @Output() listItemReordered: EventEmitter<any> = new EventEmitter<any>;

  constructor(private dailyTaskListStateFacade: DailyTaskListStateFacade) { }

  ngOnInit() {}

  listItemClickedEvent(listItem: IListItem) {
    let tempTaskList = cloneDeep(this.taskList);

    try {
      let tempListItem = tempTaskList.listItems.find((x: IListItem) => x.id === listItem.id);
      tempListItem.completed = !listItem.completed;
      if (tempListItem.completed) {
        tempTaskList.completedTaskCount ++;
      }
      else {
        tempTaskList.completedTaskCount --;
      }
    }
    catch(err) {
      console.log(err);
    }
    tempTaskList.completed = tempTaskList.completedTaskCount === tempTaskList.totalTaskCount;
    this.dailyTaskListStateFacade.updateListItem(tempTaskList);
  }

  onListClicked(currentVal: boolean) {
    this.dailyTaskListStateFacade.updateListCollapsedState(this.taskList.id, !currentVal);
  }

  handleListItemReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    let tempTaskList = cloneDeep(this.taskList);
    let reorderedItem = tempTaskList.listItems.splice(ev.detail.from, 1)[0];
    tempTaskList.listItems.splice(ev.detail.to, 0, reorderedItem);
    ev.detail.complete();
    this.listItemReordered.emit(tempTaskList);
  }
}
