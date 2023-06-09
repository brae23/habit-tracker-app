import { Task } from './task';

export interface TaskList {
    id: string;
    tasks: Task[];
    description: string;
    type: number;
    totalTaskCount: number;
    completedTaskCount: number;
    createdByUserId: string;
    associatedUserIds?: string[];
    parentListId?: string;
}
