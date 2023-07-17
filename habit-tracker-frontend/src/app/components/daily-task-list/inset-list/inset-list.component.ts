import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDragRelease, CdkDropList } from '@angular/cdk/drag-drop';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { DefaultTask } from 'src/app/models/task';
import { isNewTask } from 'src/app/functions/is-new-task.function';
import { DailyTaskListTaskGestures } from 'src/app/gestures/dtl-task.gesture';

@Component({
  selector: 'daily-task-list-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit {
  @Input() taskList: any;
  @Input() isEditMode: boolean;
  @ViewChild(CdkDropList) dropList?: CdkDropList;
  @ViewChildren('insetListItemContainer') listItemContainer: QueryList<ElementRef>;
  
  canCommitNewTask: boolean = false;
  completedTaskCount: number = 0;
  isNewTask = isNewTask;

  allowDropPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    return this.nestedDragDropService.isDropAllowed(drag, drop);
  };

  public get connectedLists() {
    return this.nestedDragDropService.dropLists;
  }

  public get dragDisabled() {
    if(!this.taskList.isCollapsed) {
      return true;
    }
    else {
      return !this.isEditMode;
    }
  }

  constructor(
    public nestedDragDropService: NestedDragDropService,
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    private dtlTaskGestures: DailyTaskListTaskGestures,
  ) { }

  ngOnInit() {
    this.evaluateCompletedState();
  }

  ngAfterViewInit() {
    if(this.dropList) {
      this.nestedDragDropService.register(this.dropList);
    }

    this.listItemContainer.forEach((x) => {
      const containerElement = x.nativeElement;
      const itemElement = containerElement.childNodes[0];
      const iconRowElement = containerElement.childNodes[1];
      const swipeGesture = this.dtlTaskGestures.create(containerElement, itemElement, iconRowElement, itemElement.getAttribute('id'), this.taskList.id, true);
      swipeGesture.enable(true);
    });
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
        this.completedTaskCount++;
      }
      else {
        this.completedTaskCount--;
      }
    }
    catch(err) {
      console.log(err);
    }
    tempTaskList.completed = this.completedTaskCount === tempTaskList.listItems.length;
    this.dailyTaskListStateFacade.updateListItem(tempTaskList);
  }

  onListClicked(currentVal: boolean) {
    this.dailyTaskListStateFacade.updateListCollapsedState(this.taskList.id, !currentVal);
  }

  onItemDropped(ev: CdkDragDrop<IListItem[]>) {
    this.nestedDragDropService.drop(ev);
    this.evaluateCompletedState();
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  onNewTaskNameEnterEvent($event: any) {
    this.canCommitNewTask = true;
    let newListItem: IListItem = {
      id: $event,
      name: $event,
      completed: false,
      createdByUserId: 'UserId1',
    }
    this.dailyTaskListStateFacade.addInsetListItem(newListItem, this.taskList.id);
    this.removeNewDefaultTask();
  }

  onNewTaskFocusOutEvent() {
    if(!this.canCommitNewTask) {
      this.removeNewDefaultTask();
    }
  }

  private removeNewDefaultTask() {
    this.dailyTaskListStateFacade.removeInsetListItem(DefaultTask.id, this.taskList.id);
  }

  private evaluateCompletedState() {
    let completed = false;
    this.taskList.listItems.map((x: IListItem) => {
      if (x.completed) {
        this.completedTaskCount++;
      }
    });
    if (this.completedTaskCount == this.taskList.listItems.length) {
      completed = true;
    }
    this.dailyTaskListStateFacade.updateListCompletedState(this.taskList.id, completed);
  }
}
