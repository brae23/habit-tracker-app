import { TaskList } from "./task-list";

export interface HabitList extends TaskList{
    recursOn: string[];
}
