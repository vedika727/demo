import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProductDetailPage } from "./product-detail";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [ProductDetailPage],
  imports: [IonicPageModule.forChild(ProductDetailPage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class ProductDetailPageModule {}
