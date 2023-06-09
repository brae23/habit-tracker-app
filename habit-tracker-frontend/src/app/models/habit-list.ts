import { TaskList } from "./task-list";

export interface HabitList {
    id: string;
    taskList: TaskList;
    recursOn: string[];
}
