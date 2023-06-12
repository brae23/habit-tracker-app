import { IListItem } from "./i-list-item";

export class Task implements IListItem {
    id: string;
    name: string;
    priority: number;
    completed: boolean;
    createdByUserId: string;
    parentTaskId?: string;
    parentListId?: string;
    dueDate?: Date;
    notes?: string;
    assignedDate?: Date;
}
