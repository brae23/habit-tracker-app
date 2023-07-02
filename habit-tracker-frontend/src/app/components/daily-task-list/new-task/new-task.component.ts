import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'daily-task-list-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent  implements OnInit, AfterViewInit{

  @ViewChild('newTask') newTaskInput: any;
  @Output() itemNameInputText: EventEmitter<string> = new EventEmitter<string>;
  @Output() lostFocusEvent: EventEmitter<any> = new EventEmitter<any>;

  constructor() { }

  ngOnInit() {}

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
