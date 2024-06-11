import { IListItem } from './i-list-item';
export class Task implements IListItem {
  id: string;
  name: string;
  completed: boolean;
  createdByUserName: string;
  parentListId?: string;
  dueDate?: number;
  notes?: string;
  assignedDate?: number;
  associatedUserIds?: string[];
  isChildTask: boolean;
}

export const DefaultTask: Task = {
  id: '00000000-0000-0000-0000-000000000000',
  name: 'New Task',
  completed: false,
  createdByUserName: 'System',
  isChildTask: false,
};
