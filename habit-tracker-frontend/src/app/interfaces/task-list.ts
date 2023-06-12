import { ListItem } from './list-item';

export class TaskList implements ListItem{
    id: string;
    name: string;
    priority: number;
    completed: boolean;
    createdByUserId: string;
    listItems: ListItem[];
    description: string;
    totalTaskCount: number;
    completedTaskCount: number;
    associatedUserIds?: string[];
}
