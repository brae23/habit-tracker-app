import { DatePipe } from "@angular/common";
import { TaskList } from "src/app/models/task-list";

export const DefaultDailyTaskListState: DailyTaskListStateModel = {
    DailyTaskList: {
        id: '',
        name: '',
        createdDate: Date.now(),
        completed: false,
        isCollapsed: true,
        createdByUserId: '',
        listItems: [],
        totalTaskCount: 0,
        completedTaskCount: 0
    }
}

export interface DailyTaskListStateModel {
    DailyTaskList: TaskList;
}