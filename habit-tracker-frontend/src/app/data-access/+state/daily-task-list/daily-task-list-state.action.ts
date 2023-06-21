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

export class UpdateListIndex {
    static readonly type = '[DailyTaskList] UpdateListIndex';
    constructor(public listItem: IListItem, public listIndex: number) {}
}

export class UpdateInsetListIndex {
    static readonly type = '[DailyTaskList] UpdateInsetListIndex';
    constructor(public listItem: IListItem, public listIndex: number) {}
}