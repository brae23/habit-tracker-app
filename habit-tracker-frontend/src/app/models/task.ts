export interface Task {
    id: string;
    name: string;
    priority?: number;
    completed: boolean;
    parentTaskId?: string;
    listId: string;
    createdByUserId: string;
    type: number;
    dueDate?: Date;
    notes?: string;
    assignedDate?: Date;
}
