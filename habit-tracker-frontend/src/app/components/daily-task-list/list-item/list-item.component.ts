import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { isList } from 'src/app/functions/is-list.function';
import { toList } from 'src/app/functions/to-list.function';
import { isNewTask } from 'src/app/functions/is-new-task.function';
import { IListItem } from 'src/app/models/i-list-item';
import { DefaultTask } from 'src/app/models/task';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { DailyTaskListTaskGestures } from 'src/app/gestures/dtl-task.gesture';

@Component({
  selector: 'daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() listItem: any;
  @Input() isEditMode: boolean;
  canCommitNewTask: boolean;

  isList = isList;
  isNewTask = isNewTask;

  constructor(
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    private nestedDragDropService: NestedDragDropService,
    private dtlTaskGesture: DailyTaskListTaskGestures,
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.listItemContainer.forEach((x) => {
      const containerElement = x.nativeElement;
      const itemElement = containerElement.childNodes[0];
      const iconRowElement = containerElement.childNodes[1];

      const swipeGesture = this.dtlTaskGesture.create(containerElement, itemElement, iconRowElement, this.listItem.id);
      swipeGesture.enable(true);

      // const longPressGesture = this.longPressGesture.create(itemElement);
      // longPressGesture.enable(true);
    });
  }

  onListItemClickedEvent(listItem: any) {
    let tempListItem = cloneDeep(listItem);
    tempListItem.completed = !listItem.completed;
    this.dailyTaskListStateFacade.updateListItem(tempListItem); 
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  makeItemListClicked() {
    this.dailyTaskListStateFacade.updateListItem(toList(this.listItem));
  }

  onNewTaskNameEnterEvent($event: any) {
    this.canCommitNewTask = true;
    let newListItem: IListItem = {
      id: $event,
      name: $event,
      completed: false,
      createdByUserId: 'UserId1',
    }
    this.dailyTaskListStateFacade.addListItem(newListItem);
    this.removeNewDefaultTask();
  }

  onNewTaskFocusOutEvent() {
    if(!this.canCommitNewTask) {
      this.removeNewDefaultTask();
    }
  }
  
  removeNewDefaultTask() {
    this.dailyTaskListStateFacade.removeListItem(DefaultTask.id);
  }
}
