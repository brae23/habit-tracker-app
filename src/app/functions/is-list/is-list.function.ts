import { IListItem } from "src/app/models/i-list-item";


export function isList(listItem: IListItem): boolean {
  return (
    listItem.hasOwnProperty('tasks')
  );
}
