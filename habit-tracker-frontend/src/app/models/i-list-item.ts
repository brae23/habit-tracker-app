export interface IListItem {
    id: string;
    name: string;
    priority: number;
    completed: boolean;
    parentListId?: string;
    createdByUserId: string;
}
