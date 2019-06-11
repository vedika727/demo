import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoInternetPage } from './no-internet';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  declarations: [
    NoInternetPage,
  ],
  imports: [
    IonicPageModule.forChild(NoInternetPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class NoInternetPageModule {}
