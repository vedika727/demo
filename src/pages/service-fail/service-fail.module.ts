import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ServiceFailPage } from "./service-fail";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [ServiceFailPage],
  imports: [IonicPageModule.forChild(ServiceFailPage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class ServiceFailPageModule {}
