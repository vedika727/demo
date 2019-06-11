import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { TruncatePipe } from "./truncate";
import { TruncateDecimalPipe } from "./truncate-decimal";
import { MaskPipe } from "./mask";
import { currencyConvertPipe } from "./amount-convert";
import { SafeHtmlPipe } from "./safe-html";
@NgModule({
  declarations: [
    TruncatePipe,
    currencyConvertPipe,
    TruncateDecimalPipe,
    MaskPipe,
    SafeHtmlPipe
  ],
  imports: [IonicModule],
  exports: [
    TruncatePipe,
    TruncateDecimalPipe,
    currencyConvertPipe,
    MaskPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule {}
