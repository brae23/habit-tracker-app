import { IListItem } from "./i-list-item";
import { TaskList } from "./task-list";

export class Task implements IListItem {
    id: string;
    name: string;
    completed: boolean;
    createdByUserId: string;
    parentTaskId?: string;
    parentListId?: string;
    dueDate?: Date;
    notes?: string;
    assignedDate?: Date;
}

export const DefaultTask: Task = {
    id: "00000000-0000-0000-0000-000000000000",
    name: "New Task",
    completed: false,
    createdByUserId: "System"
}
