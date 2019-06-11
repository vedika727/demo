import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ConfirmationAppointmentPage } from "./confirmation-appointment";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [ConfirmationAppointmentPage],
  imports: [IonicPageModule.forChild(ConfirmationAppointmentPage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class ConfirmationAppointmentPageModule {}
