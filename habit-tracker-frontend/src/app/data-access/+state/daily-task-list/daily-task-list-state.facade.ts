import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { DailyTaskListState } from "./daily-task-list.state";
import { Observable } from "rxjs";
import { TaskList } from "src/app/models/task-list";
import * as DailyTaskListActions from './daily-task-list-state.action';
import { IListItem } from "src/app/models/i-list-item";

@Injectable({
    providedIn: 'root',
})
export class DailyTaskListStateFacade {
    @Select(DailyTaskListState.getDailyTaskList) dailyTaskList$!: Observable<TaskList>;

    constructor(private store: Store) {}

    loadDailyTaskList(userId: string) {
        this.store.dispatch(new DailyTaskListActions.LoadDailyTaskList(userId));
    }

    updateListItem(listItem: IListItem) {
        this.store.dispatch(new DailyTaskListActions.UpdateListItem(listItem));
    }

    updateListCollapsedState(listItemId: string, collapsedState: boolean) {
        this.store.dispatch(new DailyTaskListActions.UpdateListCollapsedState(listItemId, collapsedState));
    }

    updateListItemIndex(listItem: IListItem, listIndex: number) {
        this.store.dispatch(new DailyTaskListActions.UpdateListIndex(listItem, listIndex));
    }

    updateInsetListItemIndex(listItem: IListItem, listIndex: number) {
        this.store.dispatch(new DailyTaskListActions.UpdateInsetListIndex(listItem, listIndex));
    }
}