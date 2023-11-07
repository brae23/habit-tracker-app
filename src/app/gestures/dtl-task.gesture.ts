import {
  AnimationController,
  DomController,
  GestureController,
  ModalController,
} from '@ionic/angular';
import { DailyTaskListStateFacade } from '../data-access/+state/daily-task-list/daily-task-list-state.facade';
import { Injectable } from '@angular/core';
import { EditTaskModalComponent } from '../components/daily-task-list/edit-task-modal/edit-task-modal.component';
import { isNewTaskId } from '../functions/is-new-task.function';

@Injectable({
  providedIn: 'root',
})
export class DailyTaskListItemGestures {
  longPressGestureActive: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private dailyTaskListStateFacade: DailyTaskListStateFacade,
    private gestureCtrl: GestureController,
    private animationCtrl: AnimationController,
    private domCtrl: DomController,
    private modalCtrl: ModalController,
  ) {}

  async create(
    containerElement: any,
    itemElement: any,
    iconRowElement: any,
    listItemId: string,
    parentListId: any = null,
    isInsetListItem: boolean = false,
  ) {
    const windowWidth = window.innerWidth;
    let startX: number;

    const modal = await this.modalCtrl.create({
      component: EditTaskModalComponent,

      componentProps: {
        ['listItemId']: listItemId,
        ['parentListItemId']: parentListId,
      },
    });

    const deleteAnimation = this.animationCtrl
      .create()
      .addElement(containerElement)
      .duration(200)
      .easing('ease-out')
      .fromTo('height', '48px', 0);

    const taskGestures = this.gestureCtrl.create(
      {
        el: itemElement,
        threshold: 0,
        gestureName: 'dtl-task-gestures',
        onStart: (ev) => {
          startX = ev.deltaX;
          this.longPressGestureActive = true;
          setTimeout(() => {
            if (
              this.longPressGestureActive &&
              !isNewTaskId(listItemId) &&
              !this.isModalOpen
            ) {
              this.isModalOpen = true;
              modal.present();
            }
          }, 750);
        },
        onMove: (ev) => {
          this.longPressGestureActive = false;
          const currentX = ev.deltaX;

          if (currentX > startX) {
            this.domCtrl.write(() => {
              itemElement.style.zIndex = 2;
              itemElement.style.transform = `translateX(${currentX}px)`;
            });
          }
        },
        onEnd: (ev) => {
          this.longPressGestureActive = false;
          itemElement.style.transition = '0.2s ease-out';
          if (ev.deltaX > windowWidth / 3.0) {
            this.domCtrl.write(() => {
              itemElement.style.transform = `translate3d(${windowWidth}px, 0, 0)`;
              iconRowElement.style.transition = '0.2s ease-out';
              iconRowElement.style.opacity = 0;
            });

            deleteAnimation.play();
            deleteAnimation.onFinish(async () => {
              // TODO: Add popup to ask if the user is sure they want to remove the item from the list
              if (isInsetListItem) {
                this.dailyTaskListStateFacade.removeInsetListItem(
                  listItemId,
                  parentListId,
                );
              } else {
                this.dailyTaskListStateFacade.removeListItem(listItemId);
              }
            });
          } else {
            this.domCtrl.write(() => {
              itemElement.style.transform = '';
            });
          }
        },
      },
      true,
    );

    modal.onDidDismiss().finally(() => {
      this.isModalOpen = false;
    });

    return taskGestures;
  }
}
