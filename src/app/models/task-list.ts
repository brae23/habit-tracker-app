import { IListItem } from './i-list-item';

export class TaskList implements IListItem {
  id: string;
  name: string;
  completed: boolean;
  isCollapsed: boolean;
  createdByUserName: string;
  listItems: IListItem[];
  createdDate: number;
  associatedUserIds?: string[];
  description?: string;
  isChildTask: boolean;
}
