import { IListItem } from "./i-list-item";
import { TaskList } from "./task-list";

export class HabitList implements TaskList, IListItem {
    id: string;
    name: string;
    priority: number;
    completed: boolean;
    createdByUserId: string;
    listItems: IListItem[];
    description: string;
    totalTaskCount: number;
    completedTaskCount: number;
    associatedUserIds?: string[];
    recursOn: string[];
}
