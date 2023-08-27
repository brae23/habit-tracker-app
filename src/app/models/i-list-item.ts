export interface IListItem {
    id: string;
    name: string;
    completed: boolean;
    parentListId?: string;
    createdByUserId: string;
    listItems?: any[];
}
