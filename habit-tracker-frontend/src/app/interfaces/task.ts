import { ListItem } from "./list-item";

export interface Task extends ListItem{
    parentTaskId?: string;
    dueDate?: Date;
    notes?: string;
    assignedDate?: Date;
}
