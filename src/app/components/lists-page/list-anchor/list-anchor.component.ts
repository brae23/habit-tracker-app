import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-lp-list-anchor',
  templateUrl: './list-anchor.component.html',
  styleUrls: ['./list-anchor.component.scss'],
})
export class ListAnchorComponent {
  @Input() taskList: List;

  constructor() {}
}
