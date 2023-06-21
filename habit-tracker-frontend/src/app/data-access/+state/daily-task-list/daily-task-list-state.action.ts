import { ItemReorderEventDetail } from '@ionic/angular';
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

export class HandleItemIndexReorder {
    static readonly type = '[DailyTaskList] HandleItemIndexReorder';
    constructor(public ev: CustomEvent<ItemReorderEventDetail>) {}
}

export class HandleInsetListItemIndexReorder {
    static readonly type = '[DailyTaskList] HandleInsetListItemIndexReorder';
    constructor(public ev: CustomEvent<ItemReorderEventDetail>, public id: string) {}
}