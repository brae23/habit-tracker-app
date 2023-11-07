import { IListItem } from '../models/i-list-item';
import { TaskList } from '../models/task-list';
import { isList } from './is-list.function';

export function findListItemArray(
  taskList: TaskList,
  id: string,
): IListItem[] | undefined {
  let listItems: IListItem[] | undefined = undefined;

  if (taskList.id === id) {
    listItems = taskList.listItems;
  } else {
    taskList.listItems.forEach((x) => {
      if (isList(x)) {
        if (x.id === id) {
          listItems = x.listItems;
        }
      }
    });
  }

  return listItems;
}
