import { IListItem } from './i-list-item';
import { TaskList } from './task-list';

export class HabitList implements TaskList {
  id: string;
  name: string;
  priority: number;
  completed: boolean;
  isCollapsed: boolean;
  createdByUserId: string;
  createdDate: number;
  listItems: IListItem[];
  description: string;
  totalTaskCount: number;
  completedTaskCount: number;
  associatedUserIds?: string[];
  recursOn: string[];
  isChildTask: boolean;
}
