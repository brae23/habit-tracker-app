import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'daily-task-list-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent  implements OnInit {

  @Output() itemNameInputText: EventEmitter<string> = new EventEmitter<string>;
  @Output() lostFocusEvent: EventEmitter<any> = new EventEmitter<any>;

  constructor() { }

  ngOnInit() {}

  onTextInputEnter(inputTextEvent: any) {
    this.itemNameInputText.emit(inputTextEvent.detail.value);
  }

  onFocusOut() {
    this.lostFocusEvent.emit();
  }

}
