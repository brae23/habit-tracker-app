import { Component, Input } from '@angular/core';

@Component({
  selector: 'dtl-chip',
  templateUrl: './dtl-chip.component.html',
  styleUrls: ['./dtl-chip.component.scss'],
})
export class DtlChipComponent {
  @Input() priority: number = 0;
  @Input() completed: boolean = false;

  priorityLabels = ['Low', 'Medium', 'High', 'Urgent'];
  priorityClass = ['low', 'medium', 'high', 'urgent'];

  constructor() {}
}
