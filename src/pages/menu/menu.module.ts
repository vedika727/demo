import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';


@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
    ComponentsModule,
    TranslateModule,
    
  ],
})
export class MenuPageModule {}
