import { ComponentsModule } from "../../components/components.module";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RegisterUserPage } from "./register-user";
import {TranslateModule} from 'ng2-translate';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
  declarations: [RegisterUserPage],
  imports: [
    IonicPageModule.forChild(RegisterUserPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegisterUserPageModule {}
