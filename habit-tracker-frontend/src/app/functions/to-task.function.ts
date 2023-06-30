import { Task } from "../models/task"

export function toTask(list: any) : Task {
    let task = {
        id: list.id,
        name: list.name,
        completed: list.completed,
        createdByUserId: list.createdByUserId,
        parentListId: list.parentListId,
        dueDate: list.dueDate,
        notes: list.notes,
        assignedDate: list.assignedDate,
    }
    return task
}