import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultipleLoanPage } from './multiple-loan';


@NgModule({
  declarations: [
    MultipleLoanPage,
  ],
  imports: [
    IonicPageModule.forChild(MultipleLoanPage),
    ComponentsModule,
    TranslateModule 
  ],
})
export class MultipleLoanPageModule {}
