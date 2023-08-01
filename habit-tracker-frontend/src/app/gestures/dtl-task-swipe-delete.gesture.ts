import { AnimationController, DomController, GestureController, ModalController } from "@ionic/angular";
import { DailyTaskListStateFacade } from "../data-access/+state/daily-task-list/daily-task-list-state.facade";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class DailyTaskListSwipeDeleteGesture {

    constructor(
        private dailyTaskListStateFacade: DailyTaskListStateFacade,
        private gestureCtrl: GestureController, 
        private animationCtrl: AnimationController, 
        private domCtrl: DomController,
    ) {}

    create(containerElement: any, itemElement: any, iconRowElement: any, listItemId: string, parentListId: any = null, isInsetListItem: boolean = false) {
        const windowWidth = window.innerWidth;
        let startX: number;
        const deleteAnimation = this.animationCtrl.create()
            .addElement(containerElement)
            .duration(200)
            .easing('ease-out')
            .fromTo('height', '48px', 0);

        const swipeGesture = this.gestureCtrl.create({
            el: itemElement,
            threshold: 0,
            gestureName: 'swipe-delete',
            onStart: ev => {
                startX = ev.deltaX;
            },
            onMove: ev => {
                const currentX = ev.deltaX;

                if (currentX > startX) {
                    this.domCtrl.write(() => {
                    itemElement.style.zIndex = 2;
                    itemElement.style.transform = `translateX(${currentX}px)`;
                    });
                }
            },
            onEnd: ev => {
                itemElement.style.transition = '0.2s ease-out';
                if(ev.deltaX > (windowWidth / 3.0)) {
                    this.domCtrl.write(() => {
                        itemElement.style.transform = `translate3d(${windowWidth}px, 0, 0)`;
                        iconRowElement.style.transition = '0.2s ease-out';
                        iconRowElement.style.opacity = 0;
                    });

                    deleteAnimation.play();
                    deleteAnimation.onFinish(async () => {
                        // TODO: Add popup to ask if the user is sure they want to remove the item from the list
                        if(isInsetListItem) {
                            this.dailyTaskListStateFacade.removeInsetListItem(listItemId, parentListId);
                        }
                        else {
                            this.dailyTaskListStateFacade.removeListItem(listItemId);
                        }
                    })
                }
                else {
                    this.domCtrl.write(() => {
                        itemElement.style.transform = '';
                    })
                }
            }
        }, true);
        
        return swipeGesture;
    }
}