import { IListItem } from './i-list-item';

export class TaskList implements IListItem{
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
}
