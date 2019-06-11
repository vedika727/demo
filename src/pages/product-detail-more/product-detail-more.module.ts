import { ComponentsModule } from "../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProductDetailMorePage } from "./product-detail-more";
import { ProvidersModule } from '../../providers/providers.module';
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [ProductDetailMorePage],
  imports: [IonicPageModule.forChild(ProductDetailMorePage), ComponentsModule,
    TranslateModule,
    ProvidersModule]
})
export class ProductDetailMorePageModule {}
