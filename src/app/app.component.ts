import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stack } from './shared/classes/Stack.class';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public numbers: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    '(-)',
  ];
  public operators: string[] = ['C', '/', '*', '-', '+', '=', 'enter'];
  public display: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  public selectedOperator: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public operand1: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public operand2: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public history: BehaviorSubject<Stack> = new BehaviorSubject<Stack>(
    new Stack()
  );
  public lastExpression: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  public justCalculated: boolean = false;
  public clearDisp: boolean = false;

  @HostListener('window:keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent): void {
    const key: string = event.key?.toLowerCase();
    let indexOfKey: number = null;
    indexOfKey = this.numbers.indexOf(key);

    if (indexOfKey !== -1) {
      this.showNumber(this.numbers[indexOfKey]);
    } else {
      indexOfKey = this.operators.indexOf(key);
      if (indexOfKey !== -1) {
        this.operate(key);
      }
    }
  }

  showNumber(num): void {
    if (this.justCalculated) {
      this.clearCalculator();
    }
    if (this.clearDisp) {
      this.display.next('0');
      this.clearDisp = false;
    }
    if (this.display.value === '0' && num !== '(-)') {
      this.display.next('');
    }
    if (num === '.' && this.display.value.includes('.')) {
      return;
    } else if (num === '(-)' && this.display.value !== '0') {
      if (this.display.value.includes('-')) {
        this.display.next(this.display.value.slice(1));
        this.operand1.next(Number(this.display.value));
      } else {
        this.display.next('-' + this.display.value);
        this.operand1.next(Number(this.display.value));
      }
    } else if (num !== '(-)') {
      this.display.next(this.display.value + String(num));
      this.justCalculated = false;
      this.operand1.next(Number(this.display.value));
      console.log({ num, op1: this.operand1.value, disp: this.display.value });
    }
  }

  operate(operator): void {
    //Clear
    if (operator === 'C') {
      this.clearCalculator();
      return;
    }

    //Equals
    if (operator === '=' || operator === 'enter') {
      if (
        this.selectedOperator.value === '=' ||
        this.selectedOperator.value === 'enter'
      ) {
        return;
      }
      if (
        (this.operand1.value === 0 || this.operand1.value) &&
        (this.operand2.value === 0 || this.operand2.value)
      ) {
        this.calculate(
          this.operand1.value,
          this.operand2.value,
          this.selectedOperator.value
        );
        this.selectedOperator.next(null);
        this.justCalculated = true;
        this.operand1.next(null);
      } else {
        return;
      }
    } else if (
      this.selectedOperator.value &&
      this.operand1.value &&
      this.operand2.value
    ) {
      this.calculate(
        this.operand1.value,
        this.operand2.value,
        this.selectedOperator.value
      );
      this.operand1.next(null);
      this.selectedOperator.next(operator);
      this.justCalculated = false;
    } else if (operator !== '=' && operator !== 'enter') {
      //Dont calc yet
      this.selectedOperator.next(operator);
      this.clearDisp = true;
      this.justCalculated = false;
      this.operand2.next(Number(this.display.value));
      this.operand1.next(null);
    }
  }

  clearCalculator(): void {
    this.display.next('0');
    this.operand1.next(null);
    this.operand2.next(null);
    this.justCalculated = false;
    this.selectedOperator.next(null);
    this.lastExpression.next('');
  }

  calculate(o1: number, o2: number, operator: string, setHistory = true): void {
    let res: number;
    if (operator === '+') {
      res = o2 + o1;
    }
    if (operator === '-') {
      res = o2 - o1;
    }
    if (operator === '*') {
      res = o2 * o1;
    }
    if (operator === '/') {
      res = o2 / o1;
    }
    this.lastExpression.next(`${o2} ${operator} ${o1}`);
    if (setHistory) {
      this.setHistory(this.lastExpression.value);
    }
    this.display.next(String(res));
    this.operand2.next(res);
    this.clearDisp = true;
    this.justCalculated = true;
    this.operand1.next(res);
  }

  setHistory(item: string): void {
    this.history.value.push(item);
  }

  handleHistory(e: Array<string | number>): void {
    this.clearCalculator();
    this.calculate(Number(e[2]), Number(e[0]), e[1] as string, false);
    this.selectedOperator.next(null);
    // this.justCalculated = true;
    this.operand1.next(null);
  }

  handleNumberClick(num: string) {
    this.showNumber(num);
  }

  handleOperatorClick(operator: string) {
    this.operate(operator);
  }
}
