import { IListItem } from "../models/i-list-item";
import { DefaultTask } from "../models/task";

export function isNewTask(item: IListItem) {
    return item.id === DefaultTask.id;
}
