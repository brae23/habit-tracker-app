export interface Task {
    id: string;
    description: string;
    priority: number;
    completed: boolean;
    parentTaskId: string;
    listId: string;
    userId: string;
    type: number;
    dueDate: Date;
    notes: string;
    recursOn: string[];
    assignedDate: Date;
}
