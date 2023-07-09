import { IListItem } from "./i-list-item";
export class Task implements IListItem {
    id: string;
    name: string;
    completed: boolean;
    createdByUserId: string;
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
