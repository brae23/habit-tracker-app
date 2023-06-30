import { IListItem } from './i-list-item';

export class TaskList implements IListItem{
    id: string;
    name: string;
    completed: boolean;
    isCollapsed: boolean;
    createdByUserId: string;
    listItems: IListItem[];
    description: string;
    totalTaskCount: number;
    completedTaskCount: number;
    associatedUserIds?: string[];
}
