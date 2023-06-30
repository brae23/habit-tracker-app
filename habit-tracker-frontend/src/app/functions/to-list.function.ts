import { DefaultTask } from "../models/task";
import { TaskList } from "../models/task-list";

export function toList(listItem: any): TaskList {
    return {
        id: listItem.id,
        name: listItem.name,
        completed: false,
        isCollapsed: false,
        createdByUserId: "UserId1",
        description: "New List",
        totalTaskCount: 1,
        completedTaskCount: 0,
        listItems: [DefaultTask]
    }
}