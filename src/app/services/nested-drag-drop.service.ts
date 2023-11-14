import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, WritableSignal, signal } from '@angular/core';
import { IListItem } from '../models/i-list-item';
import { DailyTaskListService } from './daily-task-list.service';

@Injectable({
  providedIn: 'root',
})
export class NestedDragDropService {
  public dropLists$: WritableSignal<CdkDropList<any>[]>
  private _currentHoverDropListId?: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dailyTaskListService: DailyTaskListService,
  ) {
    this.dropLists$ = signal([]);
  }

  public register(dropList: CdkDropList) {
    this.dropLists$.update((lists) => {
      lists.push(dropList);
      return lists;
    });
  }

  public unregister(dropList: CdkDropList) {
    this.dropLists$.update((lists) => {
      lists.splice(
        lists.findIndex((x) => x.id == dropList.id),
        1,
      );
      return lists;
    });
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    let elementFromPoint = this.document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y,
    );

    if (!elementFromPoint) {
      this._currentHoverDropListId = undefined;
      return;
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      this._currentHoverDropListId = undefined;
      return;
    }

    this._currentHoverDropListId = dropList.id;
  }

  dragReleased(event: CdkDragRelease) {
    this._currentHoverDropListId = undefined;
  }

  isDropAllowed(drag: CdkDrag, drop: CdkDropList) {
    if (this._currentHoverDropListId == null) {
      return true;
    }

    return drop.id === this._currentHoverDropListId;
  }

  drop(event: CdkDragDrop<IListItem[]>) {
    this.dailyTaskListService.handleItemIndexReorder(event);
  }
}
