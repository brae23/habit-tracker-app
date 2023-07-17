import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent  implements OnInit {

  constructor(private modalCtl: ModalController) { }

  ngOnInit() {}

  cancelClicked() {
    return this.modalCtl.dismiss(null, 'cancel');
  }

  confirmClicked() {
    return this.modalCtl.dismiss(null, 'confirm');
  }

}
