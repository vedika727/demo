import { Component, EventEmitter, Output, Input, OnInit, NgZone } from '@angular/core';
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { BaseApp } from '../../app/base';

/**
 * @author Kundan Patil
 * @description Keyboard Component reason beaning is this component created SIT release plan having issue with pin
 * not rendering ui on html and script execution done till ui is not replicate dots we show on html is not replicate
 * so creating 2 separate component for one is for pin-pad which is hidden input enter and this one is for show inputs
 */

@Component({
  selector: 'pin-pad-input',
  templateUrl: 'pin-pad-input.html'
})
export class PinPadInputComponent extends BaseApp implements OnInit {
  forgotPin: string;

  errorMsgPin: boolean;
  pinArray: string[];

  input: string[];
  password: string;
  pin: any;
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
    private cacheService: CacheServiceProvider,
    private zone: NgZone
  ) {
    //calling super
    super();
    this.input = [];
    this.sharedataservice.currentMessage.subscribe(message => {
      this.emptyArray = message[0];
      this.counter = message[1]
      this.forgotPin = 'login.forgotPIN'
      // this.display();
      setTimeout(() => {
        this.display()
      }, 300);
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
    if (number != -1) {
      this.input.push(number);
    }
    else {
      this.input.pop();
    }
    this.display();
    this.keyPress.emit(number);
  }
  /**
   * end keypadButtonPress()
   */

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
  /**
   * end display()
   */
 
  /**
   * @description This is emitting Forgot Pin page
   */
  callbackForgotPin() {
    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then(
      res => {
        console.log('res:', res);
        //response will come as true or false
        if (res == true) {
          this.forgotPinFunction.emit('ForgotPinPage');
        }
        else if(res == false){
          this.forgotPinFunction.emit('EnterOtpPage');
        }
      },
      err => {
        console.log("Error: cache not set")
        this.forgotPinFunction.emit('ForgotPinPage');
      }
    )
  }
}
