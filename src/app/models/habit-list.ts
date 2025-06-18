import { IListItem } from './i-list-item';
import { List } from './list';

export class HabitList implements List {
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
