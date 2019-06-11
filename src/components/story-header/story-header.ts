import { Component, Input } from '@angular/core';

/**
 * Generated class for the StoryHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'story-header',
  templateUrl: 'story-header.html'
})
export class StoryHeaderComponent {

  text: string;
  @Input('in') storiesHeader;
  constructor() {
    console.log('Hello StoryHeaderComponent Component');
    this.text = 'Hello World';
  }

}
