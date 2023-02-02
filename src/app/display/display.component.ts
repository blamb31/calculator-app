import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Input() lastExpression:string = ''
  @Input() display:string = ''
  @Input() selectedOperator:string = ''
}