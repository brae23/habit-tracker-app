import { IListItem } from 'src/app/models/i-list-item';

export function toTask(list: any): IListItem {
  let task: IListItem = {
    id: list.id,
    name: list.name,
    completed: list.completed,
    createdByUserName: list.createdByUserName,
    parentListId: list.parentListId,
    isChildTask: false,
  };
  return task;
}
