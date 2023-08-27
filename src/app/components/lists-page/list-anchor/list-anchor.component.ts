import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'lp-list-anchor',
  templateUrl: './list-anchor.component.html',
  styleUrls: ['./list-anchor.component.scss'],
})
export class ListAnchorComponent  implements OnInit {
  @Input() taskList: TaskList;

  constructor() { }

  ngOnInit() {}

}
