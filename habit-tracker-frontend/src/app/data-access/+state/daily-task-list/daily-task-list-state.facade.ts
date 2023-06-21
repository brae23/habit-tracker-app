import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { DailyTaskListState } from "./daily-task-list.state";
import { Observable } from "rxjs";
import { TaskList } from "src/app/models/task-list";
import * as DailyTaskListActions from './daily-task-list-state.action';
import { IListItem } from "src/app/models/i-list-item";
import { ItemReorderEventDetail } from "@ionic/angular";

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

    handleItemIndexReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        this.store.dispatch(new DailyTaskListActions.HandleItemIndexReorder(ev));   
    }

    handleInsetListItemIndexReorder(ev: CustomEvent<ItemReorderEventDetail>, id: string) {
        this.store.dispatch(new DailyTaskListActions.HandleInsetListItemIndexReorder(ev, id));
    }
}