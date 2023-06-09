import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-daily-task-list',
  templateUrl: './daily-task-list.component.html',
  styleUrls: ['./daily-task-list.component.scss'],
})
export class DailyTaskListComponent  implements OnInit {

  @Input() taskList: TaskList;
  currentDate: number;

  constructor() {
    this.currentDate = Date.now(); 
  }

  ngOnInit() {
  }

}
