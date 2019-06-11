import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate'
import { Http } from '@angular/http';
import { NgModule } from '@angular/core';



@NgModule({
    declarations: [
    ],
    imports: [
      TranslateModule
    ],
    exports:[TranslateModule]
  })
  export class TranslaterModule {  }