import { TaskPriority } from "./enums/task-priority";
import { IListItem } from "./i-list-item";

export class Task implements IListItem {
  id: string;
  name: string;
  completed: boolean;
  createdByUserId: string;
  hasChildTasks: boolean;
  createdDate: string;
  completedByUserId?: string | null;
  notes?: string | null;
  dueDate?: string | null;
  parentListId?: string | null;
  listIndex?: number | null;
  priority: TaskPriority;
}
