import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stack } from '../shared/classes/Stack.class';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  @Input() history: Stack;
  @Output() calculateHistory: EventEmitter<any> = new EventEmitter();
  public selectedHistory: string = 'history';

  selectHistorical(event): void {
    if (event) {
      const pieces: string[] = event.target.value.split(' ');
      this.calculateHistory.emit(pieces);
    }
    this.selectedHistory = event;
    setTimeout(() => (this.selectedHistory = 'history'), 0);
  }
}
