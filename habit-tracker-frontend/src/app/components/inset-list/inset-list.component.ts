import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';
import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';

@Component({
  selector: 'app-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit {

  @Input() taskList: any;
  @Input() isEditMode: boolean;
  @ViewChild(CdkDropList) dropList?: CdkDropList;

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  constructor(
    public nestedDragDropService: NestedDragDropService,
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    if(this.dropList) {
      this.nestedDragDropService.register(this.dropList);
    }
  }

  ngOnDestroy() {
    if(this.dropList) {
      this.nestedDragDropService.unregister(this.dropList);
    }
  }

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

  onItemDropped(ev: CdkDragDrop<IListItem[]>) {
    this.nestedDragDropService.drop(ev);
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }
}
