import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { isList } from 'src/app/functions/is-list.function';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() listItem: any;
  @Input() isEditMode: boolean;
  @Output() listItemReordered: EventEmitter<any> = new EventEmitter<any>;

  isList = isList;

  constructor(private dailyTaskListStateFacade: DailyTaskListStateFacade) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  onListItemClickedEvent(listItem: any) {
    let tempListItem = cloneDeep(listItem);
    tempListItem.completed = !listItem.completed;
    this.dailyTaskListStateFacade.updateListItem(tempListItem); 
  }

  onListItemReorderedEvent(listItem: any) {
    this.listItemReordered.emit(listItem);
  }
}
