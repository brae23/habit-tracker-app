import { TaskList } from "src/app/models/task-list";

export const DefaultDailyTaskListState: DailyTaskListStateModel = {
    DailyTaskList: {
        id: '',
        name: '',
        priority: 0,
        completed: false,
        createdByUserId: '',
        listItems: [],
        description: '',
        totalTaskCount: 0,
        completedTaskCount: 0
    }
}

export interface DailyTaskListStateModel {
    DailyTaskList: TaskList;
}