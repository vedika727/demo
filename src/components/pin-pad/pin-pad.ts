import { Component, EventEmitter, Output, Input, OnInit ,NgZone} from '@angular/core';
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { BaseApp } from '../../app/base';

/**
 * @author Vedika Bangre
 * @description Keyboard Component
 */

@Component({
  selector: 'pin-pad',
  templateUrl: 'pin-pad.html'
})
export class PinPadComponent extends BaseApp implements OnInit {
  forgotPin: string;
  errorMsgPin: boolean;
  pinArray: string[];
  input: string[];
  password: string;
  pin: any;
  delayedForConfirmPin:boolean = false;
  keypadValues: number[];
  emptyArray: boolean;
  @Output() keyPress = new EventEmitter<any>(); //output to pages
  @Input('forgotPin') forgotPinFlag: boolean;
  @Input('pinNotMatched') pinNotMatched: boolean;
  @Input('keypad') keypad: boolean;

  private counter: number = 0;
  @Output() forgotPinFunction = new EventEmitter();
  public arrayOfNumbers: any;

  constructor(
    public sharedataservice: SharedataProvider,
    private zone: NgZone
  ) {
    //calling super
    super();
    this.input = [];
    this.sharedataservice.currentMessage.subscribe(message => {
      this.emptyArray = message[0];
      this.counter = message[1]
      this.forgotPin = 'login.forgotPIN'
      this.input.length = 0;
      // this.display();
      setTimeout(() => {
        this.display()
      }, 300);
      setTimeout(() => {
      this.delayedForConfirmPin= false;      
      }, 700);
    });
    this.keypad = false;
    this.keypadValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(this.pinNotMatched)
  }
  ngOnInit() {
    this.errorMsgPin = this.pinNotMatched;
    this.counter = 3
  }

  /**
   * @description This will emit the keypad button value
   * @param number {number}
   */
  keypadButtonPress(number) {
    // if this event occur very fast functinality mismatch due to propogation of events 
    // so handling that with length of input contains more than 6 elements
    if (number != -1) {
      if (this.input.length <= 6) {
        this.input.push(number);
      }
    }
    else {
      this.input.pop();
    }
    if (this.input.length == 6) {
      this.delayedForConfirmPin= true;
      setTimeout(() => {
        console.log("completed 6 digits", this.input);
        this.keyPress.emit(this.input);
      }, 150);
    }
    this.display();
  }

  /**
   * @description This will display the values in the input buttons
   */
  display() {
    this.zone.run(() => {this.pinArray = this.input;});
    if (this.emptyArray == true) {
      this.emptyArray = false;
      setTimeout(() => {
        this.pinArray.length = 0;
      }, 300);
    }
  }
}
