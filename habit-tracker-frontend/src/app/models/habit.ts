import { Task } from './task';

export interface Habit {
    id: string;
    task: Task;
    recursOn: string[];
}
