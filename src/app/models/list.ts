import { IListItem } from "./i-list-item";
import { Task } from "./task"; // Adjust the import path as needed

export class List implements IListItem {
  id: string;
  name: string;
  createdDate: string;
  description?: string | null;
  createdByUserId: string;
  tasks: Task[];
  sublists: List[];
  parentListId?: string | null;
  listIndex?: number | null;
}
