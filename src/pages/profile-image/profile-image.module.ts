import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileImagePage } from './profile-image';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    ProfileImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileImagePage),
    TranslateModule,
    ComponentsModule
  ],
})
export class ProfileImagePageModule {}
