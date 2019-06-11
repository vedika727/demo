import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { OnboardingScreenPage } from "./onboarding-screen";
import { ProvidersModule } from "../../providers/providers.module";
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [OnboardingScreenPage],
  imports: [
    IonicPageModule.forChild(OnboardingScreenPage),
    TranslateModule,
    ProvidersModule,
    ComponentsModule
  ]
})
export class OnboardingScreenPageModule {}
