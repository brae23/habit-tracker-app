import { IListItem } from './i-list-item';
import { Task } from './task';

export class Habit implements Task, IListItem {
  id: string;
  name: string;
  priority: number;
  completed: boolean;
  createdByUserId: string;
  parentTaskId?: string;
  parentListId?: string;
  dueDate?: number;
  notes?: string;
  assignedDate?: number;
  recursOn: string[];
  isChildTask: boolean;
}
