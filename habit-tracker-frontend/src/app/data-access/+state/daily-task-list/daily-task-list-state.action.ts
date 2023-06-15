import { IListItem } from '../../../models/i-list-item';

export class LoadDailyTaskList {
    static readonly type = '[DailyTaskList] LoadDailyTaskList';
    constructor(public userId: string) {}
}

export class UpdateListItem {
    static readonly type = '[DailyTaskList] UpdateListItem';
    constructor(public listItem: IListItem) {}
}

export class UpdateListCollapsedState {
    static readonly type = '[DailyTaskList] UpdateListCollapsedState';
    constructor(public listItemId: string, public collapsedState: boolean) {}
}