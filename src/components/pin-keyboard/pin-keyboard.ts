import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the PinKeyboardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pin-keyboard',
  templateUrl: 'pin-keyboard.html'
})
export class PinKeyboardComponent {

  text: string;
  keypadValues: number[];
  @Input('keypad') keypad: boolean;
  @Output() keyPress = new EventEmitter<number>(); //output to pages

  constructor() {
    console.log('Hello PinKeyboardComponent Component');
    this.keypad = false;
    this.keypadValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  keypadButtonPress(number) {
    this.keyPress.emit(number);
  }
}
