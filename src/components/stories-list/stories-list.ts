import { Component, Input, OnInit } from '@angular/core';
import { Stories } from '../../common/models/cms-stories.class';

/**
 * Generated class for the StoriesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stories-list',
  templateUrl: 'stories-list.html'
})
export class StoriesListComponent implements OnInit{

@Input('in')story:Stories

  constructor() {
    console.log('Hello StoriesListComponent Component');
  }

  ngOnInit(): void {
  }

}
