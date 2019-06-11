import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    MyAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
    
  ],
})
export class MyAccountPageModule {}
