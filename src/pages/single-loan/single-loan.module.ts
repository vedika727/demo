import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleLoanPage } from './single-loan';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SingleLoanPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleLoanPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class SingleLoanPageModule {}
