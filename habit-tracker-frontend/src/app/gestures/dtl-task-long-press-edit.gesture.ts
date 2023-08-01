import { GestureController, ModalController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { EditTaskModalComponent } from "../components/daily-task-list/edit-task-modal/edit-task-modal.component";
import { isNewTaskId } from "../functions/is-new-task.function";

@Injectable({
    providedIn: 'root'
})
export class DailyTaskListLongPressEditGesture {
    longPressGestureActive: boolean = false;

    constructor(
        private gestureCtrl: GestureController, 
        private modalCtrl: ModalController,
    ) {}

    create(element: any, listItemId: string, parentListId: any = null) {

        const longPressGesture = this.gestureCtrl.create({
            el: element,
            threshold: 0,
            gestureName: 'long-press-edit-task',
            onStart: ev => {
                this.longPressGestureActive = true;
                setTimeout(() => {
                    if(this.longPressGestureActive && !isNewTaskId(listItemId)) {
                        this.openEditModal(listItemId, parentListId);
                    }
                }, 750);
            },
            onMove: ev => {
                this.longPressGestureActive = false;
            },
            onEnd: ev => {
                this.longPressGestureActive = false;
            }
        }, true);
        
        return longPressGesture;
    }

    private async openEditModal(listItemId: string, parentListId: string) {
        const modal = await this.modalCtrl.create({
            component: EditTaskModalComponent,
            
            componentProps: { 
                ['listItemId']: listItemId,
                ['parentListItemId']: parentListId,
            },
        });

        modal.present(); 
    }
}