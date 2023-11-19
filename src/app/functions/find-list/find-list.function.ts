import { IListItem } from '../../models/i-list-item';
import { TaskList } from '../../models/task-list';
import { isList } from '../is-list/is-list.function';

export function findListItemArray(
  taskList: TaskList,
  id: string,
): IListItem[] | undefined {
  let listItems: IListItem[] | undefined = undefined;

  if (taskList.id === id) {
    listItems = taskList.listItems;
  } else {
    taskList.listItems.forEach((item: IListItem) => {
      if (isList(item)) {
        if (item.id === id) {
          listItems = item.listItems;
        }
      }
    });
  }

  return listItems;
}
