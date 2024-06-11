export interface IListItem {
  id: string;
  name: string;
  completed: boolean;
  parentListId?: string;
  createdByUserName: string;
  listItems?: any[];
  isChildTask: boolean;
}
