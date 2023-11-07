import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-daily-task-list-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements AfterViewInit {
  @ViewChild('newTask') newTaskInput: any;
  @Output() itemNameInputText: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() lostFocusEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit() {
    this.newTaskInput.setFocus();
  }

  onTextInputEnter(inputTextEvent: any) {
    this.itemNameInputText.emit(inputTextEvent.detail.value);
  }

  onFocusOut() {
    this.lostFocusEvent.emit();
  }
}
