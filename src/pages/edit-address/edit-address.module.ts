import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAddressPage } from './edit-address';
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    EditAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAddressPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class EditAddressPageModule {}
