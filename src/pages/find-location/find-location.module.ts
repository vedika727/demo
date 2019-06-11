import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindLocationPage } from './find-location';
// import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    FindLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FindLocationPage),
    TranslateModule,
    ComponentsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBEHbtzGqA5e9LLY4HzozVjHq6uOqsNbpc'
    // })
  ],
})
export class FindLocationPageModule {}
