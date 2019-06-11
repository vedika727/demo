import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SplashScreenPage } from "./splash-screen";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [SplashScreenPage],
  imports: [IonicPageModule.forChild(SplashScreenPage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class SplashScreenPageModule {}
