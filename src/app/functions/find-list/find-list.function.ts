
import { IListItem } from 'src/app/models/i-list-item';
import { List } from '../../models/list';
import { isList } from '../is-list/is-list.function';

export function findListItemArray(
  taskList: List,
  id: string,
): IListItem[] | undefined {
  let listItems: IListItem[] | undefined = undefined;

  // if (taskList.id === id) {
  //   tasks = taskList.tasks;
  // } else {
  //   taskList.sublists.forEach((item: IListItem) => {
  //     if (isList(item)) {
  //       if (item.id === id) {
  //         listItems = item.listItems;
  //       }
  //     }
  //   });
  // }

  return listItems;
}
