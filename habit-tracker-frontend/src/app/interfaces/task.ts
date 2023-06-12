import { ListItem } from "./list-item";

export class Task implements ListItem{
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
