import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { IListItem } from 'src/app/models/i-list-item';
import { TaskList } from 'src/app/models/task-list';

@Component({
  selector: 'app-inset-list',
  templateUrl: './inset-list.component.html',
  styleUrls: ['./inset-list.component.scss'],
})
export class InsetListComponent implements OnInit {

  @Input() taskList: any;
  isListClosed: boolean = true;

  constructor(private dailyTaskListStateFacade: DailyTaskListStateFacade) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  listItemClickedEvent(listItem: IListItem) {
    let tempTaskList = cloneDeep(this.taskList);

    try {
      let tempListItem = tempTaskList.listItems.find((x: IListItem) => x.id === listItem.id);
      tempListItem.completed = !listItem.completed;
      if (tempListItem.completed) {
        tempTaskList.completedTaskCount ++;
      }
      else {
        tempTaskList.completedTaskCount --;
      }
    }
    catch(err) {
      console.log(err);
    }
    tempTaskList.completed = tempTaskList.completedTaskCount === tempTaskList.totalTaskCount;
    this.dailyTaskListStateFacade.updateListItem(tempTaskList);
  }

  onListClicked(currentVal: boolean) {
    this.isListClosed = !currentVal;
  }
}
