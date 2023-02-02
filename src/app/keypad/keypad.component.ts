import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css'],
})
export class KeypadComponent {
  @Input() numbers: string[];
  @Input() operators: string[];
  @Output() numberClicked: EventEmitter<any> = new EventEmitter();
  @Output() operatorClicked: EventEmitter<any> = new EventEmitter();
}
