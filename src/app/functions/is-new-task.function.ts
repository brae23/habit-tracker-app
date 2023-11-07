import { IListItem } from '../models/i-list-item';
import { DefaultTask } from '../models/task';

export function isNewTask(item: IListItem) {
  return item.id === DefaultTask.id;
}

export function isNewTaskId(itemId: string) {
  return itemId === DefaultTask.id;
}
