import { IListItem } from '../../../models/i-list-item';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export class LoadDailyTaskList {
  static readonly type = '[DailyTaskList] LoadDailyTaskList';
  constructor(public userId: string) {}
}

export class UpdateListItem {
  static readonly type = '[DailyTaskList] UpdateListItem';
  constructor(public listItem: IListItem) {}
}

export class AddListItem {
  static readonly type = '[DailyTaskList] AddListItem';
  constructor(public listItem: IListItem) {}
}

export class AddInsetListItem {
  static readonly type = '[DailyTaskList] AddInsetListItem';
  constructor(
    public listItem: IListItem,
    public parentListId: string,
  ) {}
}

export class RemoveListItem {
  static readonly type = '[DailyTaskList] RemoveListItem';
  constructor(public listItemId: string) {}
}

export class RemoveInsetListItem {
  static readonly type = '[DailyTaskList] RemoveInsetListItem';
  constructor(
    public listItemId: string,
    public parentListId: string,
  ) {}
}

export class UpdateListCollapsedState {
  static readonly type = '[DailyTaskList] UpdateListCollapsedState';
  constructor(
    public listItemId: string,
    public collapsedState: boolean,
  ) {}
}

export class UpdateListCompletedState {
  static readonly type = '[DailyTaskList] UpdateListCompletedState';
  constructor(
    public listItemId: string,
    public completedState: boolean,
  ) {}
}

export class HandleItemIndexReorder {
  static readonly type = '[DailyTaskList] HandleItemIndexReorder';
  constructor(public ev: CdkDragDrop<IListItem[]>) {}
}
