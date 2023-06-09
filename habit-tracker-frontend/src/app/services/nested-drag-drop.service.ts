import { CdkDrag, CdkDragDrop, CdkDragMove, CdkDragRelease, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IListItem } from '../models/i-list-item';
import { DailyTaskListStateFacade } from '../data-access/+state/daily-task-list/daily-task-list-state.facade';

@Injectable({
  providedIn: 'root'
})
export class NestedDragDropService {
  dropLists: CdkDropList[] = [];
  currentHoverDropListId?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dailyTaskListStateFacade: DailyTaskListStateFacade) {}

  public register(dropList: CdkDropList) {
    this.dropLists.push(dropList);
  }

  public unregister(dropList: CdkDropList) {
    this.dropLists.splice(this.dropLists.findIndex((x) => x.id === dropList.id), 1);
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    let elementFromPoint = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y
    );

    if (!elementFromPoint) {
      this.currentHoverDropListId = undefined;
      return;
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      this.currentHoverDropListId = undefined;
      return;
    }

    this.currentHoverDropListId = dropList.id;
  }

  dragReleased(event: CdkDragRelease) {
    this.currentHoverDropListId = undefined;
  }

  isDropAllowed(drag: CdkDrag, drop: CdkDropList) {
    if (this.currentHoverDropListId == null) {
      return true;
    }

    return drop.id === this.currentHoverDropListId;
  }

  drop(event: CdkDragDrop<IListItem[]>) {
    this.dailyTaskListStateFacade.handleItemIndexReorder(event);
  }
  
}
