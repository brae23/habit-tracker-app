import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { cloneDeep } from 'lodash';
import { DailyTaskListStateFacade } from 'src/app/data-access/+state/daily-task-list/daily-task-list-state.facade';
import { isList } from 'src/app/functions/is-list.function';
import { toList } from 'src/app/functions/to-list.function';
import { isNewTask } from 'src/app/functions/is-new-task.function';
import { IListItem } from 'src/app/models/i-list-item';
import { DefaultTask } from 'src/app/models/task';
import { NestedDragDropService } from 'src/app/services/nested-drag-drop.service';
import { createGesture } from '@ionic/core';
import { AnimationController, DomController, GestureController } from '@ionic/angular';

@Component({
  selector: 'daily-task-list-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @ViewChildren('listItemContainer') listItemContainer: QueryList<ElementRef>;
  @Input() listItem: any;
  @Input() isEditMode: boolean;
  canCommitNewTask: boolean;

  isList = isList;
  isNewTask = isNewTask;

  constructor(
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    private nestedDragDropService: NestedDragDropService,
    private gestureCtrl: GestureController, 
    private animationCtrl: AnimationController, 
    private domCtrl: DomController,
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    const windowWidth = window.innerWidth;
    let startX: number;

    this.listItemContainer.forEach((x) => {
      const containerElement = x.nativeElement;
      const itemElement = containerElement.childNodes[0];
      const iconRowElement = containerElement.childNodes[1];
      const deleteAnimation = this.animationCtrl.create()
        .addElement(containerElement)
        .duration(200)
        .easing('ease-out')
        .fromTo('height', '48px', 0);

      const swipeGesture = this.gestureCtrl.create({
        el: itemElement,
        threshold: 15,
        direction: 'x',
        gestureName: 'swipe-delete',
        onStart: ev => {
          startX = ev.deltaX;
          console.log(startX);
        },
        onMove: ev => {
          const currentX = ev.deltaX;
          console.log(currentX);

          this.domCtrl.write(() => {
            itemElement.style.zIndex = 2;
            itemElement.style.transform = `translateX(${currentX}px)`;
          });
        },
        onEnd: ev => {
          itemElement.style.transition = '0.2s ease-out';

          if(ev.deltaX > (windowWidth / 2.0)) {
            this.domCtrl.write(() => {
              itemElement.style.transform = `translate3d(${windowWidth}px, 0, 0)`;
            });

            deleteAnimation.play();
            deleteAnimation.onFinish(async () => {
              // Remove the item from the list
              // TODO: Add popup to ask if the user is sure they want to remove the item from the list
              this.dailyTaskListStateFacade.removeListItem(this.listItem.id);
            })
          }
          else {
            this.domCtrl.write(() => {
              itemElement.style.transform = '';
            })
          }
        }
      }, true);

      swipeGesture.enable(true);
    })
  }

  ngOnChanges(changes: SimpleChanges) {}

  onListItemClickedEvent(listItem: any) {
    let tempListItem = cloneDeep(listItem);
    tempListItem.completed = !listItem.completed;
    this.dailyTaskListStateFacade.updateListItem(tempListItem); 
  }

  dragMoved(event: CdkDragMove<IListItem>) {
    this.nestedDragDropService.dragMoved(event);
  }

  dragReleased(event: CdkDragRelease) {
    this.nestedDragDropService.dragReleased(event);
  }

  makeItemListClicked() {
    this.dailyTaskListStateFacade.updateListItem(toList(this.listItem));
  }

  onNewTaskNameEnterEvent($event: any) {
    this.canCommitNewTask = true;
    let newListItem: IListItem = {
      id: $event,
      name: $event,
      completed: false,
      createdByUserId: 'UserId1',
    }
    this.dailyTaskListStateFacade.addListItem(newListItem);
    this.removeNewDefaultTask();
  }

  onNewTaskFocusOutEvent() {
    if(!this.canCommitNewTask) {
      this.removeNewDefaultTask();
    }
  }
  
  removeNewDefaultTask() {
    this.dailyTaskListStateFacade.removeListItem(DefaultTask.id);
  }
}
