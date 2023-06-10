import { ListItem } from './list-item';

export interface TaskList extends ListItem{
    listItems: ListItem[];
    description: string;
    totalTaskCount: number;
    completedTaskCount: number;
    createdByUserId: string;
    associatedUserIds?: string[];
}
