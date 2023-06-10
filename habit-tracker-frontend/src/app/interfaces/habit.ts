import { Task } from './task';

export interface Habit extends Task {
    recursOn: string[];
}
