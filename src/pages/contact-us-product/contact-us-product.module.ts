import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ContactUsProductPage } from "./contact-us-product";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [ContactUsProductPage],
  imports: [IonicPageModule.forChild(ContactUsProductPage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class ContactUsProductPageModule {}
