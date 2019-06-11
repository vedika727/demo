import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: 'dashboard-header.html'
})
export class DashboardHeaderComponent implements OnInit{
    @Input('in') headerdata:HeaderData;
    constructor() {
    console.log('Hello DashboardHeaderComponent Component');
    }
  ngOnInit(){
  
  }
}
/**
 *@author Banti Sutar
 */
export class HeaderData{
  title:string;
  icon:string;
}