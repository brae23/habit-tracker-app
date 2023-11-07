import { IListItem } from '../models/i-list-item';

export function isList(listItem: IListItem): boolean {
  return (
    listItem.hasOwnProperty('listItems') && listItem.listItems?.length! > 0
  );
}
