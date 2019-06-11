import { Component, Input,OnInit } from '@angular/core';
import { LogServiceProvider } from '../../providers/data-service/log-service';
/**
   * @author Banti Sutar
   * @description component for policy tabs header.
   */
@Component({
  selector: 'policy-title',
  templateUrl: 'policy-title.html'
})
export class PolicyTitleComponent implements OnInit{
  @Input('In') policyDetails:any
   constructor(public logger : LogServiceProvider) {
    this.logger.log('Hello PolicyTitleComponent Component',this.policyDetails);
  }
  ngOnInit(){
    this.logger.log('Hello PolicyTitleComponent Component', this.policyDetails);
  }
}
