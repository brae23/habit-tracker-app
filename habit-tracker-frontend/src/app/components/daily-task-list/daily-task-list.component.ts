import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent  implements OnInit {

  @Input() taskList: TaskList;
  @Output() taskClicked: EventEmitter<Task> = new EventEmitter();
  currentDate: number;

  constructor() {
    this.currentDate = Date.now(); 
  }

  ngOnInit() {
  }

  onTaskClicked(task: Task) {
    task.completed = !task.completed;
    this.taskClicked.emit(task);
  }
}
